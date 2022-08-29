import React from 'react';
import { PropTypes } from 'prop-types';
import * as S from './styles';

class MusicCard extends React.Component {
  render() {
    const {
      track,
      favoriteAllTracks,
      favoritedTracks,
      favoriteHandler,
    } = this.props;
    const {
      trackName,
      previewUrl,
      trackId,
    } = track;
    return (
      <S.Card>
        <S.Title>
          { trackName }
        </S.Title>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <S.FavoriteCheckBox
          onChange={ () => favoriteHandler(track) }
          checked={ favoriteAllTracks || favoritedTracks.includes(trackId) }
          id={ `favorite-music-${trackId}` }
          testid={ `checkbox-music-${trackId}` }
        />
      </S.Card>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  favoritedTracks: PropTypes.arrayOf(PropTypes.number),
  favoriteAllTracks: PropTypes.bool,
  favoriteHandler: PropTypes.func.isRequired,
};

MusicCard.defaultProps = {
  favoritedTracks: [],
  favoriteAllTracks: undefined,
};

export default MusicCard;
