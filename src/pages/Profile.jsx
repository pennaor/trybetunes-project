import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

class Profile extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <List sx={ { width: '100%', maxWidth: '420px' } }>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              src={ user.image }
              alt={ `Foto de ${user.name}` }
              imgProps={ { 'data-testid': 'profile-image' } }
            >
              { user.name[0] }
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={ `${user.name}` }
            secondary={ user.email }
          />
          <ListItemText
            sx={ { textAlign: 'end' } }
            primary={ <Link to="/profile/edit">Editar perfil</Link> }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemText
            primary="Descrição"
            secondary={ user.description }
            sx={ {
              textAlign: 'center',
            } }
          />
        </ListItem>
      </List>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Profile;
