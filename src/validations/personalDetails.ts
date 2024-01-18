import * as yup from 'yup';
const mobileRegex = /^[6789]\d{9}$/;

export const personalDataschema = yup.object({
    name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  
    age: yup
      .number()
      .required('Age is required')
      .typeError('Age must be a number')
      .positive('Age must be a positive number')
      .min(1, 'Age must be at least 1 year')
      .max(100, 'Age must be at most 100 years')
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .nullable(),
  
    sex: yup.string().required('Sex is required').oneOf(['male', 'female']),
  
    mobile: yup
      .number()
      .required('Mobile is required')
      .positive('Mobile must be a positive number')
      .test('is-indian-mobile', 'Mobile number should be 10 digits and a vailid indian number', (value: number | undefined) => {
        return mobileRegex.test(value?.toString() || '');
      })
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .nullable(),
  
    idType: yup.string().required('ID Type is required').oneOf(['aadhar', 'pan']),
  
    idNumber: yup
    .string()
    .required('ID Number is required')
    .typeError('ID Number must be a number')
    .min(4, 'ID Number must be at least 4 characters')
    .test({
      name: 'is-valid-id',
      test: function(value) {
        const idType = this.resolve(yup.ref('idType'));
        
        if (idType === 'aadhar') {
          const isValidLength = value.toString().length === 12;
          const doesNotStartWithZeroOrOne = /^[2-9]\d{11}$/.test(value.toString());

          if (!isValidLength) {
            throw this.createError({
              path: 'idNumber',
              message: 'Aadhar ID must be 12 digits long',
            });
          }

          if (!doesNotStartWithZeroOrOne) {
            throw this.createError({
              path: 'idNumber',
              message: 'Aadhar ID should not start with 0 or 1',
            });
          }
        } else if (idType === 'pan') {
          const isValidPan = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value.toString());

          if (!isValidPan) {
            throw this.createError({
              path: 'idNumber',
              message: 'Invalid PAN ID',
            });
          }
        }

        return true;
      },
    })
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .nullable(),

  


  });