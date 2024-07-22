import { object, string } from "yup";

const loginSchema = object({
  email: string().email("Formato inválido").required("Campo obrigatório"),
  password: string()
    .required("Campo obrigatório")
    .min(8, "No mínimo 8 caracteres"),
});

export default loginSchema;