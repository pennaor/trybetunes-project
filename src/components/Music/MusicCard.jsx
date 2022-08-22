import React from 'react';
import { PropTypes } from 'prop-types';
import { Card, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material';

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
      <Card>
        <CardContent
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.7em',
          } }
        >
          <Typography variant="h6" fontSize="1.2em">
            { trackName }
          </Typography>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <FormControlLabel
            label="Favorita"
            onChange={ () => favoriteHandler(track) }
            checked={ favoriteAllTracks || favoritedTracks.includes(trackId) }
            control={
              <Checkbox
                id={ `favorite-music-${trackId}` }
                inputProps={ { 'data-testid': `checkbox-music-${trackId}` } }
                size="small"
              />
            }
          />
        </CardContent>
      </Card>
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
