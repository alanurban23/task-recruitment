import * as yup from "yup";

export const transactionSchema = yup.object().shape({
  beneficiary: yup.string().required("Beneficiary is required"),
  amount: yup
    .number()
    .positive("Amount needs to be bigger than 0")
    .required("Amount is required"),
  account: yup.string().required("Account number is required"),
  address: yup.string().required("Address is required"),
  description: yup.string().required("Description is required"),
});
