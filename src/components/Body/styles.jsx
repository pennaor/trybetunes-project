import React from 'react';
import { Box, Container } from '@mui/material';

export const Body = ({ children: [Header, ...children] }) => (
  <Container
    maxWidth="md"
    sx={ {
      bgcolor: 'white',
      mt: '10px',
      borderRadius: '10px',
    } }
    component="div"
    data-testid="page-profile"
    disableGutters
  >
    { Header }
    <Box
      component="main"
      padding={ 3 }
      sx={ {
        borderRadius: '0px 0px 10px 10px',
        borderWidth: '0px 1px 1px 1px',
        borderStyle: 'solid',
        borderColor: '#2ba377',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      } }
    >
      { children }
    </Box>
  </Container>
);
