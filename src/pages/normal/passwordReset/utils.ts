import type { ResetStep } from './types';

const STEP_TITLES: Record<ResetStep, string> = {
  request: 'Redefinir Senha',
  verify: 'Verificar Código',
  confirm: 'Nova Senha',
};

const STEP_SUBTITLES: Record<ResetStep, string> = {
  request: 'Digite seu email para receber o código de verificação',
  verify: 'Digite o código de 6 dígitos enviado para seu email',
  confirm: 'Digite sua nova senha',
};

export const getStepTitle = (step: ResetStep) => STEP_TITLES[step];

export const getStepSubtitle = (step: ResetStep) => STEP_SUBTITLES[step];