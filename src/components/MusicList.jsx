import React from 'react';
import { PropTypes } from 'prop-types';
import { List, ListItem } from '@mui/material';
import MusicCard from './MusicCard';
import Loading from './Loading';

class MusicList extends React.Component {
  render() {
    const {
      tracks,
      isLoading,
    } = this.props;
    return !isLoading ? (
      <List>
        { tracks.map((track) => (
          <ListItem key={ track.trackName }>
            <MusicCard track={ track } { ...this.props } />
          </ListItem>
        )) }
      </List>
    ) : (<Loading />);
  }
}

MusicList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool.isRequired,
};

MusicList.defaultProps = {
  tracks: [],
};

export default MusicList;
