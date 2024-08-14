import * as yup from 'yup';

const voucherSchema = yup.object().shape({
  voucherCode: yup
    .string(),
});

export default voucherSchema;
