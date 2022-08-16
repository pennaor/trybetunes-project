import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <Box sx={ { display: 'flex', justifyContent: 'center', margin: '40px' } }>
        <CircularProgress />
      </Box>
    );
  }
}

export default Loading;
