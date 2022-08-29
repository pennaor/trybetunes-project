/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Header from '../../components/Header/Header';

export const NotFound = ({ children }) => (
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

export const Message = ({ children }) => (
  <Typography variant="h5">
    { children }
  </Typography>
);
