/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import {
  Card as MuiCard,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
} from '@mui/material';

export const AlbumList = ({ children }) => (
  <Container
    className="album-list"
    sx={ {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      gap: '1em',
    } }
  >
    { children }
  </Container>
);

export const Title = ({ children }) => (
  <Typography variant="h6" padding="20px">
    { children }
  </Typography>
);

export const Message = ({ children }) => (
  <Typography variant="body2">
    { children }
  </Typography>
);
