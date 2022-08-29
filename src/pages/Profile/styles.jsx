import React from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

export const Profile = ({ children: [UserPhoto, UserEmail, UserDescription] }) => (
  <List
    sx={ {
      width: '100%',
      maxWidth: '420px',
    } }
  >
    <ListItem alignItems="flex-start">
      { UserPhoto }
      { UserEmail }
      <ListItemText
        sx={ { textAlign: 'end' } }
        primary={ <Link to="/profile/edit">Editar perfil</Link> }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem>
      { UserDescription }
    </ListItem>
  </List>
);

export const UserPhoto = ({ image, name }) => (
  <ListItemAvatar>
    <Avatar
      src={ image }
      alt={ `Foto de ${name}` }
      imgProps={ { 'data-testid': 'profile-image' } }
    >
      { name[0] }
    </Avatar>
  </ListItemAvatar>
);

export const UserEmail = ({ name, email }) => (
  <ListItemText
    primary={ `${name}` }
    secondary={ email }
  />
);

export const UserDescription = ({ description }) => (
  <ListItemText
    primary="Descrição"
    secondary={ description }
    sx={ {
      textAlign: 'center',
    } }
  />
);
