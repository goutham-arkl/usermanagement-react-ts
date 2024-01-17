import * as yup from 'yup';

export const addressSchema = yup.object({

    pincode: yup
      .number()
      .required('Pincode is required')
      .typeError('Pincode must be a number')
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .nullable(),
  });