import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import DateFormater from '../utils/DateFormater';

export default function AlbumCard(props) {
  const { album, history } = props;
  const {
    artistName,
    collectionId,
    collectionName,
    artworkUrl100,
    releaseDate,
    trackCount,
  } = album;
  return (
    <Card
      data-testid={ `link-to-album-${collectionId}` }
    >
      <CardActionArea
        onClick={ () => history.push(`/album/${collectionId}`) }
        sx={ {
          display: 'flex',
          justifyContent: 'space-around',
          width: '300px',
          height: '180px',
          p: '16px',
          gap: '1em',
        } }
      >
        <CardMedia
          component="img"
          image={ artworkUrl100 }
          alt={ collectionName }
          sx={ {
            flexBasis: '120px',
          } }
        />
        <CardContent
          sx={ {
            textAlign: 'center',
            flexBasis: '120px',
            p: '0px',
          } }
        >
          <Typography variant="h6" component="div" fontSize="1.15rem">
            { collectionName }
          </Typography>
          <Typography variant="body2">
            { artistName }
          </Typography>
          <Typography variant="body2">
            { new DateFormater(releaseDate).format() }
          </Typography>
          <Typography variant="body2">
            { trackCount }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
