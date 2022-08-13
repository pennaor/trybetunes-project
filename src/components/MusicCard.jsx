import React from 'react';
import { PropTypes } from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      tracks,
      favoriteAllTracks,
      favoritedTracks,
      favoriteHandler,
    } = this.props;
    return (
      <ul>
        { tracks.map((track) => {
          const { trackName, previewUrl, trackId } = track;
          return (
            <li key={ trackName }>
              <span>{ trackName }</span>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ `favorite-music-${trackId}` }>
                Favorita
                <input
                  id={ `favorite-music-${trackId}` }
                  type="checkbox"
                  checked={ favoriteAllTracks || favoritedTracks.includes(trackId) }
                  onChange={ () => favoriteHandler(track) }
                  data-testid={ `checkbox-music-${trackId}` }
                />
              </label>
            </li>
          );
        }) }
      </ul>
    );
  }
}

MusicCard.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object),
  favoritedTracks: PropTypes.arrayOf(PropTypes.number),
  favoriteAllTracks: PropTypes.bool,
  favoriteHandler: PropTypes.func.isRequired,
};

MusicCard.defaultProps = {
  tracks: [],
  favoritedTracks: [],
  favoriteAllTracks: undefined,
};

export default MusicCard;
