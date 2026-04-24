import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as yup from 'yup';

import { UserAuthSchema } from '@utils/validations/user';
import useSystemStore from '@stores/system';
import useDevice from '@hooks/useDevice';
import useAction from '@hooks/useAction';
import { signIn } from '@actions/user';

import type { SignInData } from '../types';

const useSignIn = () => {
  const [credentials, setCredentials] = useState<SignInData>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const { system } = useSystemStore();
  const { isPwa } = useDevice();
  const navigate = useNavigate();

  const handleInputChange = (field: keyof SignInData) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setCredentials((prev) => ({ ...prev, [field]: event.target.value }));

  const handleClearEmail = () => setCredentials((prev) => ({ ...prev, email: '' }));

  const handleTogglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!credentials.email.trim() || !credentials.password.trim()) {
      setErrorMessage('Preencha todos os campos');
      return;
    }

    setErrorMessage('');
    setSuccess(false);

    try {
      await UserAuthSchema.validate(credentials);

      useAction({
        action: async () => await signIn(credentials),
        onError: () => setErrorMessage('Ocorreu um erro ao fazer login.'),
        toastMessages: {
          success: 'Autenticação realizada com sucesso',
          error: 'Ocorreu um erro na autenticação',
          pending: 'Realizando autenticação',
        },
        callback: () => {
          setSuccess(true);
          const checkToken = setInterval(() => {
            const token = localStorage.getItem('token');
            if (token) {
              clearInterval(checkToken);

              const shouldPromptPwa = !!system.pwaEvent && !system.pwaInstallRejected && !isPwa;
              navigate(shouldPromptPwa ? '/dashboard/pwa-install' : '/dashboard/general');
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
    showPassword,
    errorMessage,
    success,
    handleInputChange,
    handleClearEmail,
    handleTogglePasswordVisibility,
    handleSubmit
  };
};

export default useSignIn;