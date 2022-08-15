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
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getProfileInformation();
  }

  getProfileInformation = async () => {
    const { fetchUser } = this.props;
    const user = await fetchUser();
    this.setState({ user, isLoading: false });
  }

  render() {
    const {
      user: { name, email, image, description },
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
        data-testid="page-profile"
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
          { !isLoading ? (
            <List sx={ { width: '100%', maxWidth: '420px' } }>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    src={ image }
                    alt={ `Foto de ${name}` }
                    imgProps={ { 'data-testid': 'profile-image' } }
                  >
                    { name[0] }
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={ `${name}` }
                  secondary={ email }
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
                  secondary={ description }
                  sx={ {
                    textAlign: 'center',
                  } }
                />
              </ListItem>
            </List>
          ) : (
            <Loading />
          ) }
        </Box>
      </Container>
    );
  }
}

Profile.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

export default Profile;
