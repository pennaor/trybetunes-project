import React from 'react';
import { Box, Container, FormControl, TextField, Typography } from '@mui/material';
import Header from '../../components/Header';

export const Login = ({ children }) => (
  <Container
    maxWidth="sm"
    sx={ {
      bgcolor: 'white',
      mt: '25vh',
      borderRadius: '10px',
    } }
    component="main"
    data-testid="page-login"
    disableGutters
  >
    <Header />
    <Box
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        border: 1,
        p: 3,
        mx: 'auto',
        boxShadow: '0 3px 5px 2px #2fc18c73',
        borderRadius: '0px 0px 10px 10px',
        borderWidth: '0px 1px 1px 1px',
        borderStyle: 'solid',
        borderColor: '#2ba377',
      } }
    >
      { children }
    </Box>
  </Container>
);

export const Form = ({ children, onSubmit }) => (
  <form
    onSubmit={ onSubmit }
    sx={ {
      width: 'fit-content',
      margin: 'auto',
    } }
  >
    <FormControl
      sx={ {
        alignItems: 'center',
      } }
    >
      { children }
    </FormControl>
  </form>
);

export const Title = ({ text }) => (
  <Typography variant="h5" component="h1" marginTop={ 1 }>
    { text }
  </Typography>
);

export const Input = ({ type, name, placeholder, onChange, testid }) => (
  <TextField
    variant="outlined"
    label="Usuário"
    margin="normal"
    autoFocus
    type={ type }
    name={ name }
    placeholder={ placeholder }
    onChange={ onChange }
    inputProps={ { 'data-testid': testid } }
  />
);
