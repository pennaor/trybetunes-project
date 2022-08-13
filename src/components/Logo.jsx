import { Grid, Icon, Typography } from '@mui/material';
import React from 'react';

export default function Logo() {
  return (
    <Grid item>
      <Typography variant="h4" color="inherit" component="span">
        TrybeTunes
        <Icon sx={ { ml: 0.5, verticalAlign: 'middle' } }>equalizer</Icon>
      </Typography>
    </Grid>
  );
}
