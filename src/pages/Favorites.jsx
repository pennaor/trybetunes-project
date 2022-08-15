import React from 'react';
import { PropTypes } from 'prop-types';
import { Box, Container, Typography } from '@mui/material';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicList from '../components/MusicList';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const { onUserAuthenticate } = this.props;
    onUserAuthenticate(this.fetchFavoritesTracks);
  }

  fetchFavoritesTracks = async () => {
    const tracks = await getFavoriteSongs();
    this.setState({
      tracks,
      isLoading: false,
    });
  }

  favoriteHandler = async (track) => {
    const {
      tracks,
    } = this.state;
    const { trackId } = track;
    this.setState({
      isLoading: true,
      tracks: tracks.filter((music) => music.trackId !== trackId),
    });
    await removeSong(track);
    this.setState({ isLoading: false });
  }

  render() {
    const {
      tracks,
      isLoading,
    } = this.state;
    const {
      user,
      isRefreshingUser,
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
        data-testid="page-favorites"
        disableGutters
      >
        <Header user={ user } />
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
          { !isRefreshingUser ? (
            <>
              <Typography variant="h5">
                Minhas Favoritas
              </Typography>
              <MusicList
                isLoading={ isLoading }
                tracks={ tracks }
                favoriteAllTracks
                favoriteHandler={ this.favoriteHandler }
              />
            </>
          ) : (<Loading />) }
        </Box>
      </Container>
    );
  }
}

Favorites.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default Favorites;
