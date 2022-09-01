import React from 'react';
import { Button as MuiButton, FormControl, TextField, Typography } from '@mui/material';

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
  <Typography variant="h5" component="h1" marginY={ 1 }>
    { text }
  </Typography>
);

export const Input = ({ type, label, name, placeholder, onChange, testid }) => (
  <TextField
    variant="outlined"
    label={ label }
    margin="normal"
    autoFocus
    type={ type }
    name={ name }
    placeholder={ placeholder }
    onChange={ onChange }
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
