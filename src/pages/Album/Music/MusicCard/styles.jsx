import React from 'react';
import {
  Card as MuiCard,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';

export const Card = ({ children }) => (
  <MuiCard>
    <CardContent
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.7em',
      } }
    >
      { children }
    </CardContent>
  </MuiCard>
);

export const Title = ({ children }) => (
  <Typography variant="h6" fontSize="1.2em">
    { children }
  </Typography>
);

export const FavoriteCheckBox = ({ onChange, checked, id, testid }) => (
  <FormControlLabel
    label="Favorita"
    onChange={ onChange }
    checked={ checked }
    control={
      <Checkbox
        id={ id }
        inputProps={ { 'data-testid': testid } }
        size="small"
      />
    }
  />
);
