import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Header from '../components/Header/Header';

class NotFound extends React.Component {
  render() {
    return (
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
          <Typography variant="h5">
            404 - Not Found
          </Typography>
        </Box>
      </Container>
    );
  }
}

export default NotFound;
