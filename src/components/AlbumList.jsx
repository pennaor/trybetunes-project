import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Container,
  Typography,
} from '@mui/material';
import AlbumCard from './AlbumCard';

export default function AlbumList(props) {
  const { result, searched, redirectToAlbum } = props;
  if (searched) {
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
          {`Resultado de álbuns de: ${searched}`}
        </Typography>
        { result.length > 0 ? (
          result.map((album) => (
            <AlbumCard
              key={ album.collectionId }
              album={ album }
              redirectToAlbum={ redirectToAlbum }
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
  searched: PropTypes.string.isRequired,
  redirectToAlbum: PropTypes.func.isRequired,
};
