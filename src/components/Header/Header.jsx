import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { PropTypes } from 'prop-types';
import { Grid, Typography } from '@mui/material';
import Logo from './Logo';
import Navigation from './Navigation';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Box sx={ { flexGrow: 1 } }>
        <AppBar
          position="static"
          data-testid="header-component"
          sx={ { borderRadius: '10px 10px 0px 0px' } }
        >
          <Toolbar
            variant="dense"
            sx={ { flexWrap: 'wrap', p: 2 } }
          >
            <Grid
              container
              spacing={ 2 }
              width={ 1 }
              justifyContent={ user ? 'space-between' : 'center' }
              alignContent="center"
              alignItems="center"
            >
              <Logo />
              { user.name && (
                <Grid item>
                  <Typography
                    variant="caption"
                    color="inherit"
                    sx={ {
                      fontSize: '12px',
                      padding: '6px 8px',
                    } }
                    data-testid="header-user-name"
                  >
                    { user.name }
                  </Typography>
                </Grid>
              ) }
            </Grid>
            <Navigation userName={ user.name } />
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Header.defaultProps = {
  user: {},
};

export default Header;
