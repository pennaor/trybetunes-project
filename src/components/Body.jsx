import React from 'react';
import { PropTypes } from 'prop-types';
import { Box, Container } from '@mui/material';
import { Redirect } from 'react-router-dom';
import Header from './Header/Header';

class Body extends React.Component {
  render() {
    const { children, user, onUserLogout } = this.props;
    return user.name ? (
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
        <Header user={ user } onUserLogout={ onUserLogout } />
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
    ) : (
      <Redirect to="/" />
    );
  }
}

Body.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  children: PropTypes.element.isRequired,
  onUserLogout: PropTypes.func.isRequired,
};

Body.defaultProps = {
  user: {},
};

export default Body;
