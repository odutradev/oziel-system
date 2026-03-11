import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import * as yup from 'yup';

import { requestPasswordReset, verifyPasswordResetCode, confirmPasswordReset } from '@actions/user';
import { PasswordResetConfirmSchema } from '@utils/validations/user';
import useAction from '@hooks/useAction';

import type { ResetStep, PasswordResetState } from '../types';

const usePasswordReset = () => {
  const [formData, setFormData] = useState<PasswordResetState>({ email: '', code: '', newPassword: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<ResetStep>('request');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuto, setIsAuto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hasAutoRequested = useRef(false);

  const handleInputChange = (field: keyof PasswordResetState) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));

  const handleTogglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = formData.code.split('');
    newCode[index] = value;
    const updatedCode = newCode.join('').slice(0, 6);

    setFormData((prev) => ({ ...prev, code: updatedCode }));

    if (value && index < 5) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !formData.code[index] && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }
  };

  const handlePinPaste = (event: React.ClipboardEvent) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    setFormData((prev) => ({ ...prev, code: pastedData }));
    const nextEmptyIndex = pastedData.length < 6 ? pastedData.length : 5;
    pinRefs.current[nextEmptyIndex]?.focus();
  };

  const handleRequestCode = async (event?: React.FormEvent<HTMLFormElement>, emailOverride?: string) => {
    if (event) event.preventDefault();

    const emailToUse = emailOverride || formData.email;

    if (!emailToUse.trim()) {
      setErrorMessage('Preencha o email');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    useAction({
      action: async () => await requestPasswordReset({ email: emailToUse }),
      onError: () => {
        setErrorMessage('Erro ao solicitar código');
        setIsLoading(false);
      },
      toastMessages: {
        success: 'Código enviado para o email',
        error: 'Erro ao enviar código',
        pending: 'Enviando código',
      },
      callback: () => {
        setStep('verify');
        setIsLoading(false);
      },
    });
  };

  const handleVerifyCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.code.length !== 6) {
      setErrorMessage('Digite o código completo (6 dígitos)');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    useAction({
      action: async () => await verifyPasswordResetCode({ email: formData.email, code: formData.code }),
      onError: () => {
        setErrorMessage('Código inválido');
        setIsLoading(false);
      },
      toastMessages: {
        success: 'Código verificado com sucesso',
        error: 'Erro ao verificar código',
        pending: 'Verificando código',
      },
      callback: () => {
        setStep('confirm');
        setIsLoading(false);
      },
    });
  };

  const handleConfirmPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.newPassword.trim() || !formData.confirmPassword.trim()) {
      setErrorMessage('Preencha todos os campos');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('As senhas não conferem');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      await PasswordResetConfirmSchema.validate({
        email: formData.email,
        code: formData.code,
        newPassword: formData.newPassword,
      });

      useAction({
        action: async () =>
          await confirmPasswordReset({
            email: formData.email,
            code: formData.code,
            newPassword: formData.newPassword,
          }),
        onError: () => {
          setErrorMessage('Erro ao redefinir senha');
          setIsLoading(false);
        },
        toastMessages: {
          success: 'Senha redefinida com sucesso',
          error: 'Erro ao redefinir senha',
          pending: 'Redefinindo senha',
        },
        callback: () => {
          setIsLoading(false);
          setTimeout(() => navigate('/dashboard/profile'), 1500);
        },
      });
    } catch (error) {
      setIsLoading(false);
      if (error instanceof yup.ValidationError) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleBack = () => {
    if (step === 'verify') {
      setStep('request');
      setErrorMessage('');
      return;
    }

    if (step === 'confirm') {
      setStep('verify');
      setErrorMessage('');
      return;
    }

    if (isAuto) {
      navigate('/dashboard/profile');
      return;
    }

    navigate('/signin');
  };

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const autoParam = searchParams.get('auto');

    if (emailParam) {
      setFormData((prev) => (prev.email === emailParam ? prev : { ...prev, email: emailParam }));

      if (autoParam === 'true') {
        setIsAuto(true);
        if (!hasAutoRequested.current) {
          hasAutoRequested.current = true;
          handleRequestCode(undefined, emailParam);
        }
      }
    }
  }, [searchParams]);

  return {
    formData,
    step,
    errorMessage,
    showPassword,
    pinRefs,
    isAuto,
    isLoading,
    handleInputChange,
    handlePinChange,
    handlePinKeyDown,
    handlePinPaste,
    handleTogglePasswordVisibility,
    handleRequestCode,
    handleVerifyCode,
    handleConfirmPassword,
    handleBack,
  };
};

export default usePasswordReset;