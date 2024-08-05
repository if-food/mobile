import { object, string } from "yup";

const addressSchema = object({
    cep: string()
    .required("Campo obrigatório")
    .min(8, "CEP inválido"),
    state: string()
    .required("Campo obrigatório"),
    city: string()
    .required("Campo obrigatório"),
    neighborhood: string()
    .required("Campo obrigatório"),
    street: string()
    .required("Campo obrigatório"),
    number: string(),
    complement: string()
})

export default addressSchema;