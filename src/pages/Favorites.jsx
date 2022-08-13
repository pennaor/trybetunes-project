import React from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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
    const {
      fetchUser,
    } = this.props;
    return (
      <div data-testid="page-favorites">
        <Header fetchUser={ fetchUser } />
        <h4>Favorites</h4>
        { !isLoading ? (
          <MusicCard
            tracks={ tracks }
            favoriteAllTracks
            favoriteHandler={ this.favoriteHandler }
          />
        ) : (
          <Loading />
        ) }
      </div>
    );
  }
}

Favorites.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

export default Favorites;
