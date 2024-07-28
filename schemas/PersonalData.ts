import { object, string, date } from "yup";

const personalDataSchema = object({
  name: string()
    .required("Campo obrigatório")
    .min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: string()
    .email("Formato inválido")
    .required("Campo obrigatório"),
  birthDate: date()
    .required("Campo obrigatório")
    .max(new Date(), "A data de nascimento não pode ser no futuro")
    .typeError("Data inválida"),
  phone: string()
    .required("Campo obrigatório")
    .matches(/^\+?[1-9]\d{1,14}$/, "Formato de telefone inválido"),
  cpf: string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
    .required("Campo obrigatório"),
});

export default personalDataSchema;
