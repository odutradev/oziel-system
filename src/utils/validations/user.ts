import * as yup from "yup";

export const UserAuthSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(4, "A senha deve ter no mínimo 4 caracteres"),
  name: yup
    .string()
    .required("Nome é obrigatório")
    .optional()
});

export const PasswordResetRequestSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório")
});

export const PasswordResetVerifySchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório"),
  code: yup
    .string()
    .required("Código é obrigatório")
});

export const PasswordResetConfirmSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório"),
  code: yup
    .string()
    .required("Código é obrigatório"),
  newPassword: yup
    .string()
    .required("Nova senha é obrigatória")
    .min(4, "A senha deve ter no mínimo 4 caracteres")
});

export const UpdateProfileSchema = yup.object().shape({
  name: yup
    .string()
    .optional(),
  description: yup
    .string()
    .optional(),
  cpfOrRg: yup
    .string()
    .optional()
});
