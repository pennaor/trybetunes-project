import React from 'react';
import { PropTypes } from 'prop-types';
import DateFormater from '../../../../utils/DateFormater';
import * as S from './styles';

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
    <S.AlbumCard
      onClick={ () => history.push(`/album/${collectionId}`) }
      testid={ `link-to-album-${collectionId}` }
    >
      <S.AlbumMedia
        image={ artworkUrl100 }
        alt={ collectionName }
      />
      <S.AlbumContent
        collection={ collectionName }
        artist={ artistName }
        releaseDate={ new DateFormater(releaseDate).format() }
        trackCount={ trackCount }
      />
    </S.AlbumCard>
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
