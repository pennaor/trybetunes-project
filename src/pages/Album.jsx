import React from 'react';
import { PropTypes } from 'prop-types';
import { Box, Container, Typography } from '@mui/material';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicList from '../components/MusicList';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: {},
      tracks: [],
      favoritedTracks: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    if (musics.length) {
      const favorites = await getFavoriteSongs();
      const album = musics[0];
      const tracks = musics.slice(1);
      this.setState({
        album,
        tracks,
        isLoading: false,
        favoritedTracks: favorites.map(({ trackId }) => trackId),
      });
    }
  }

  favoriteHandler = async (track) => {
    const { favoritedTracks } = this.state;
    const { trackId } = track;
    if (favoritedTracks.includes(trackId)) {
      this.setState({
        isLoading: true,
        favoritedTracks: favoritedTracks.filter((favoritedId) => favoritedId !== trackId),
      });
      await removeSong(track);
    } else {
      this.setState({ isLoading: true, favoritedTracks: [trackId, ...favoritedTracks] });
      await addSong(track);
    }
    this.setState({ isLoading: false });
  }

  render() {
    const {
      album,
      tracks,
      favoritedTracks,
      isLoading,
    } = this.state;
    const {
      fetchUser,
    } = this.props;
    return (
      <Container
        maxWidth="md"
        sx={ {
          bgcolor: 'white',
          mt: '10px',
          borderRadius: '10px',
        } }
        component="main"
        data-testid="page-album"
        disableGutters
      >
        <Header fetchUser={ fetchUser } />
        <Box
          padding={ 3 }
          sx={ {
            borderRadius: '0px 0px 10px 10px',
            borderWidth: '0px 1px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#2ba377',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          } }
        >
          <Typography variant="h5">
            { album.collectionName }
          </Typography>
          <Typography variant="subtitle1">
            { album.artistName }
          </Typography>
          { !isLoading ? (
            <MusicList
              tracks={ tracks }
              favoritedTracks={ favoritedTracks }
              favoriteHandler={ this.favoriteHandler }
            />
          ) : (
            <Loading />
          ) }
        </Box>
      </Container>
    );
  }
}

Album.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
  params: PropTypes.shape({ id: PropTypes.string }),
  id: PropTypes.string,
};

Album.defaultProps = {
  match: {},
  params: {},
  id: '',
};

export default Album;
