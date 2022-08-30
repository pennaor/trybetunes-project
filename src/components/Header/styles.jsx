import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Icon, Button, Grid, Typography } from '@mui/material';

export const Header = ({ children, user }) => (
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
          { children }
        </Grid>
      </Toolbar>
    </AppBar>
  </Box>
)

export const User = ({ userName, onUserLogout }) => (
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
      { userName }
    </Typography>
    <Button
      type="button"
      color="secondary"
      onClick={ onUserLogout }
      sx={ { minWidth: '10px' } }
      >
      <Icon
        sx={ {
          fontSize: '1.1em',
        } }
      >
        logout
      </Icon>
    </Button>
  </Grid>
);
