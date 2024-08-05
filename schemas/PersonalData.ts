import { object, string } from "yup";

const personalDataSchema = object({
  name: string()
    .required("Campo obrigatório")
    .min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: string()
    .email("Formato inválido")
    .required("Campo obrigatório"),
  birthDate: string()
    .typeError("Data inválida"),
  phone: string(),
  cpf: string()
    .notRequired()
});

export default personalDataSchema;
