import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Container,
  Typography,
} from '@mui/material';
import AlbumCard from './AlbumCard';
import Loading from '../Loading';

export default function AlbumList(props) {
  const { result, artist, isLoading, history } = props;
  if (isLoading) {
    return (<Loading />);
  }
  if (artist) {
    return (
      <Container
        className="album-list"
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: '1em',
        } }
      >
        <Typography variant="h6" padding="20px">
          {`Resultado de álbuns de: ${artist}`}
        </Typography>
        { result.length > 0 ? (
          result.map((album) => (
            <AlbumCard
              key={ album.collectionId }
              album={ album }
              history={ history }
            />))
        ) : (
          <Typography variant="body2">
            Nenhum álbum foi encontrado
          </Typography>
        ) }
      </Container>
    );
  }
  return null;
}

AlbumList.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
  artist: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
