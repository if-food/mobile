import { object, string, ref } from "yup";

const passwordSchema = string()
  .required("Campo obrigatório")
  .min(8, "No mínimo 8 caracteres")
  .matches(/[A-Z]/, "Pelo menos uma letra maiúscula")
  .matches(/[!@#$%^&*(),.?":{}|<>]/, "Pelo menos um caractere especial");

const registerSchema = object({
  name: string()
    .required("Campo obrigatório")
    .min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: string()
    .email("Formato inválido")
    .required("Campo obrigatório"),
  password: passwordSchema,
  confirmPassword: string()
    .required("Campo obrigatório")
    .oneOf([ref('password')], "As senhas devem corresponder"),
});

export default registerSchema;
