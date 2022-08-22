import React from 'react';
import { Typography } from '@mui/material';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicList from '../components/Music/MusicList';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchFavoritesTracks();
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
    return (
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
    );
  }
}

export default Favorites;
