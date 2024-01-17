import { Container, Typography } from '@mui/material';

type CountryListProps = {
  countries: string[];
  setIsOpen: (isOpen: boolean) => void; 
  setCountry: (country: string) => void;
};

const ContainerStyle = {
  position: 'absolute',
  paddingLeft: '0 !important',
  left: '0px',
  bottom: '-160px',
  width: '100%',
  height: '160px',
  minHeight: '30px',
  overflowY: 'scroll',
  overflowX: 'hidden',
  zIndex: '2',
  background: '#f5f5f5',
};

const hoverStyle = {
  marginLeft: '0 !important',
  cursor: 'pointer',
  padding: '5px',
  margin: '0',
  ':hover': {
    background: '#1976d2',
    color: 'white',
  },
};

const CountryList = ({ countries, setIsOpen, setCountry }: CountryListProps) => {

    const handleSelect = (country: string) => {
        setCountry(country);
        setIsOpen(false);
    }
  return (
    <Container sx={ContainerStyle}>
      {countries &&
        countries.map((country: string) => (
          <Typography sx={hoverStyle} onClick={() => handleSelect(country)} key={country}>
            {country}
          </Typography>
        ))}
    </Container>
  );
};

export default CountryList;
