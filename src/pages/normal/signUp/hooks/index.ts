import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as yup from 'yup';

import { UserAuthSchema } from '@utils/validations/user';
import useAction from '@hooks/useAction';
import { signUp } from '@actions/user';

import type { SignUpData, SignUpContextType } from '../types';

const useSignUp = (): SignUpContextType => {
  const [credentials, setCredentials] = useState<SignUpData>({ email: '', password: '', name: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (field: keyof SignUpData) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setCredentials((prev) => ({ ...prev, [field]: event.target.value }));

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(event.target.value);

  const handleClearField = (field: keyof SignUpData) => () =>
    setCredentials((prev) => ({ ...prev, [field]: '' }));

  const handleTogglePasswordVisibility = () =>
    setShowPassword((prev) => !prev);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!credentials.email.trim() || !credentials.password.trim() || !confirmPassword.trim()) {
      setErrorMessage('Preencha todos os campos');
      return;
    }
    if (credentials.password !== confirmPassword) {
      setErrorMessage('As senhas não conferem');
      return;
    }

    setErrorMessage('');
    setSuccess(false);

    try {
      await UserAuthSchema.validate(credentials);

      useAction({
        action: async () => await signUp(credentials),
        onError: () => setErrorMessage('Ocorreu um erro ao fazer cadastro.'),
        toastMessages: {
          success: 'Cadastro realizado com sucesso',
          error: 'Ocorreu um erro no cadastro',
          pending: 'Realizando cadastro',
        },
        callback: () => {
          setSuccess(true);
          const checkToken = setInterval(() => {
            const token = localStorage.getItem('token');
            if (token) {
              clearInterval(checkToken);
              navigate('/dashboard/profile');
            }
          }, 1000);
        },
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrorMessage(error.message);
      }
    }
  };

  return {
    credentials,
    confirmPassword,
    showPassword,
    errorMessage,
    success,
    handleInputChange,
    handleConfirmPasswordChange,
    handleClearField,
    handleTogglePasswordVisibility,
    handleSubmit,
  };
};

export default useSignUp;