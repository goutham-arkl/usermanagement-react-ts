import React, { useEffect,  useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import axios from 'axios';
import CountryList from '../CountryList';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { addressSchema } from '../../validations/addressDetails';
import { buttonStyles, containerStyles, formStyles, headingStyles, inputContainerStyles, inputStyles, selectContainerStyles, selectStyles } from './addressDetailsStyles';
import { motion } from 'framer-motion';

type FormData = {
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: number;
};



const AddressDetails = ({ personalDetails }: { personalDetails: {} }) => {
  const [countries, setCountries] =useState([]);
  const [country,setCountry]=useState('');
  const [isOpen,setIsOpen]=useState(false)
  const navigate=useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<FormData>({
    defaultValues: {
      address: '',
      country: '',
      state: '',
      city: '',
    },
    resolver: yupResolver(addressSchema) as any,
  });
  const { errors } = form.formState;
  const { register, control, handleSubmit, watch,setValue } = form;
  const countryValue = watch('country') || '';

  const onSubmit = (data: FormData, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    dispatch(addUser({ ...personalDetails, ...data }));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/')

    
  };

  const fetchCountry = async (keyword: string) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${keyword}`);
      const data = response.data;
      const countries = data.map((country: any) => country.name.common);
      setCountries(countries);
      setIsOpen(true)
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleCountryChange = (newValue: string) => {
    if (newValue !== '') {
      fetchCountry(newValue);
    }
  };

  useEffect(() => {
    // handleCountryChange(countryValue);
    if(country!==''){
        setIsOpen(false)
      setValue('country',country)
    }
  }, [countryValue]);

  

  return (
    <motion.div
    key={'personalDetails'}
    initial={{ opacity: 0.5, x: 900 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -900 }}
    transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
    style={{ width: '100%', overflow: 'hidden' }}
  >
    <Container sx={formStyles}>
      <form  onSubmit={handleSubmit(onSubmit)}>
        <Box sx={containerStyles}>
            <Typography sx={headingStyles}>Address Info</Typography>
          <Box sx={selectContainerStyles}>
            <TextField sx={inputStyles} label='Address' id='address' type='text' variant="standard"  {...register('address')} />
            <Box sx={inputStyles}>
              <TextField sx={{ width: '100%' }} label='Country' id='country' type='text'  variant="standard" {...register('country')} onChange={(e) => handleCountryChange(e.target.value)} />
             {countries.length > 0  && isOpen && <CountryList countries={countries} setCountry={setCountry} setIsOpen={setIsOpen}/>}
            </Box>
          </Box>
          <Box sx={selectContainerStyles}>
            <TextField sx={selectStyles} label='State' id='state' type='text' variant="standard"  {...register('state')}/>
            <TextField sx={selectStyles} label='City' id='city' type='text' variant="standard"  {...register('city')}/>
          </Box>

          <Box sx={inputContainerStyles}>
            <TextField sx={inputStyles} InputProps={{ inputProps: { inputMode: 'numeric' } }} label='Pincode' error={!!errors.pincode} helperText={errors.pincode?.message} id='pincode' type='number' variant="standard" {...register('pincode')} />
          </Box>
          <Button sx={buttonStyles} color='success' variant='contained' type="submit">
            submit
          </Button>
        </Box>
      </form>
    </Container>
    </motion.div>
  );
};

export default AddressDetails;
