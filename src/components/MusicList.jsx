import React from 'react';
import { PropTypes } from 'prop-types';
import { List, ListItem } from '@mui/material';
import MusicCard from './MusicCard';

class MusicList extends React.Component {
  render() {
    const {
      tracks,
    } = this.props;
    return (
      <List>
        { tracks.map((track) => (
          <ListItem key={ track.trackName }>
            <MusicCard track={ track } { ...this.props } />
          </ListItem>
        )) }
      </List>
    );
  }
}

MusicList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object),
};

MusicList.defaultProps = {
  tracks: [],
};

export default MusicList;
