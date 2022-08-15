import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Profile extends React.Component {
  componentDidMount() {
    const { onUserAuthenticate } = this.props;
    onUserAuthenticate();
  }

  render() {
    const { user, isRefreshingUser } = this.props;
    return (
      <Container
        maxWidth="md"
        sx={ {
          bgcolor: 'white',
          mt: '10px',
          borderRadius: '10px',
        } }
        component="main"
        data-testid="page-profile"
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
          ) : (<Loading />) }
        </Box>
      </Container>
    );
  }
}

Profile.propTypes = {
  onUserAuthenticate: PropTypes.func.isRequired,
};

export default Profile;
