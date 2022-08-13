import React from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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
      <div data-testid="page-album">
        <Header fetchUser={ fetchUser } />
        <div>
          <h3 data-testid="artist-name">{ album.artistName }</h3>
          <h4 data-testid="album-name">{ album.collectionName }</h4>
        </div>
        { !isLoading ? (
          <MusicCard
            tracks={ tracks }
            favoritedTracks={ favoritedTracks }
            favoriteHandler={ this.favoriteHandler }
          />
        ) : (
          <Loading />
        ) }
      </div>
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
