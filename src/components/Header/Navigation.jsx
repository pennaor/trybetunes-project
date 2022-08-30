import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

export default function Navigation() {
  return (
    <Grid
      container
      justifyContent="flex-end"
      width={ 1 }
      spacing={ 2 }
      component="nav"
    >
      <Grid item>
        <Button
          component={ Link }
          to="/search"
          data-testid="link-to-search"
          color="secondary"
        >
          Pesquisar
        </Button>
      </Grid>
      <Grid item>
        <Button
          component={ Link }
          to="/favorites"
          data-testid="link-to-favorites"
          color="secondary"
        >
          Favoritos
        </Button>
      </Grid>
      <Grid item>
        <Button
          component={ Link }
          to="/profile"
          data-testid="link-to-profile"
          color="secondary"
        >
          Meu Perfil
        </Button>
      </Grid>
    </Grid>
  );
}
