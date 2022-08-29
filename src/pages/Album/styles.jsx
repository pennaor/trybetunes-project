/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Typography } from '@mui/material';

export const Title = ({ children }) => (
  <Typography variant="h5">
    { children }
  </Typography>
);

export const SubTitle = ({ children }) => (
  <Typography variant="subtitle1">
    { children }
  </Typography>
);
