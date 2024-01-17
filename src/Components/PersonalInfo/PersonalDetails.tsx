import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { TextField, Select, MenuItem, Button, InputLabel, FormControl, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { AnimatePresence, motion } from "framer-motion"
import { containerBoxStyle, formControlStyle, headingStyles, idBlockStyle, idFormControlStyle, idSelectInputStyle, inputContainerStyle, inputStyle, selectInputStyle } from './personalInfoStyles';
import { personalDataschema } from '../../validations/personalDetails';

type FormValues = {
  name: string;
  age: number;
  sex: string;
  mobile: number;
  idType: string;
  idNumber: number;
};

const PersonalDetails = ({ setPersonalDetails,setStep }: { setPersonalDetails: (personalDetails: FormValues) => void,setStep:(step:number) => void } ) => {
  

  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      sex: '',
      idType: '',
     
    },
    resolver: yupResolver(personalDataschema) as any,
  });
  const { register, handleSubmit } = form;
  const { errors } = form.formState;

  const onSubmit = (data: FormValues, event?: React.BaseSyntheticEvent) => {
    console.log('submitted', data);
    setPersonalDetails(data);
    setStep(2);
  };

  return (
    <AnimatePresence>

<motion.div
  key={'personalDetails'}
  initial={{ opacity: 0.5, x: 900 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -900 }}
  transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }} 
  style={{ width: '100%', overflow: 'hidden' }}
>
    <Container sx={{ background: '#f5f5f5' }}>
      <form autoComplete="off"  onSubmit={handleSubmit(onSubmit)}>
        <Box sx={containerBoxStyle}>
        <Typography sx={headingStyles}>Personal Info</Typography>
          <Box sx={inputContainerStyle}>
            <TextField
              sx={inputStyle}
              error={!!errors.name}
              helperText={errors.name?.message}
              label="Name"
              type="text"
              id="name"
              variant="standard"
              {...register('name')}
            />
            <TextField
              sx={inputStyle}
              error={!!errors.age}
              helperText={errors.age?.message}
              label="Age"
              type="number"
              id="age"
              variant="standard"
              {...register('age')}
            />
          </Box>
          <Box sx={inputContainerStyle}>
          <FormControl sx={formControlStyle} size="small" error={!!errors.sex} >
            <InputLabel htmlFor="sex">Sex</InputLabel>
            <Select sx={selectInputStyle} error={!!errors.sex} type="text" id="sex" {...register('sex')} variant="standard">
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            </FormControl>
            <TextField
              sx={inputStyle}
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
              label="Mobile"
              id="mobile"
              type="number"
              variant="standard"
              {...register('mobile')}
            />
          </Box>

          <Box sx={idBlockStyle}>
            <FormControl sx={idFormControlStyle} size="small" error={!!errors.idType}>

            <InputLabel htmlFor="idType">ID</InputLabel>
            <Select
              sx={idSelectInputStyle}
              error={!!errors.idType}
              label="Id"
              id="idType"
              type="text"
              variant="standard"
              {...register('idType')}
              >
              <MenuItem value="aadhar">Aadhar</MenuItem>
              <MenuItem value="pan">PAN</MenuItem>
            </Select>
                </FormControl>
            <TextField
              id="idNumber"
              error={!!errors.idNumber}
              helperText={errors.idNumber?.message}
              sx={{ width: '30%' }}
              label="Enter ID Number"
              type="text"
              variant="standard"
              {...register('idNumber')}
            />
          </Box>
          <Button type="submit" size="large" variant="contained" color="success">
            Next
          </Button>
        </Box>
      </form>
    </Container>
    </motion.div>
    </AnimatePresence>

  );
};

export default PersonalDetails;
