import React from 'react';
import {
  Button as MuiButton,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';

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

export const Title = ({ children }) => (
  <Typography variant="h5" component="h1" marginY={ 1 }>
    { children }
  </Typography>
);

export const Input = ({ testid, ...props }) => (
  <TextField
    variant="outlined"
    margin="normal"
    { ...props }
    inputProps={ { 'data-testid': testid } }
  />
);

export const TextArea = ({ testid, ...props }) => (
  <TextField
    variant="outlined"
    margin="normal"
    multiline
    rows={ 4 }
    { ...props }
    inputProps={ { 'data-testid': testid } }
  />
);

export const Button = ({ type, children, disabled, testid }) => (
  <MuiButton
    variant="outlined"
    type={ type }
    data-testid={ testid }
    disabled={ disabled }
  >
    { children }
  </MuiButton>
);
