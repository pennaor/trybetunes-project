/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

export const AlbumCard = ({ onClick, children, testid }) => (
  <Card
    data-testid={ testid }
  >
    <CardActionArea
      onClick={ onClick }
      sx={ {
        display: 'flex',
        justifyContent: 'space-around',
        width: '300px',
        height: '180px',
        p: '16px',
        gap: '1em',
      } }
    >
      { children }
    </CardActionArea>
  </Card>
);

export const AlbumMedia = ({ image, alt }) => (
  <CardMedia
    component="img"
    image={ image }
    alt={ alt }
    sx={ {
      flexBasis: '120px',
    } }
  />
);

export const AlbumContent = ({ collection, artist, releaseDate, trackCount }) => (
  <CardContent
    sx={ {
      textAlign: 'center',
      flexBasis: '120px',
      p: '0px',
    } }
  >
    <Typography variant="h6" component="div" fontSize="1.15rem">
      { collection }
    </Typography>
    <Typography variant="body2">
      { artist }
    </Typography>
    <Typography variant="body2">
      { releaseDate }
    </Typography>
    <Typography variant="body2">
      { trackCount }
    </Typography>
  </CardContent>
);
