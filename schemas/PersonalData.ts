import { object, string } from "yup";

const personalDataSchema = object({
  nome: string()
    .required("Campo obrigatório")
    .min(2, "O nome deve ter pelo menos 2 caracteres"),
  dataNascimento: string()
    .typeError("Data inválida"),
  phone: string(),
  cpf: string()
    .notRequired()
});

export default personalDataSchema;
