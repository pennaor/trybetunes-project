import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login/index';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';
import Body from './Body';

export default function Routes({ user, createUser, updateUser, onUserLogout }) {
  return (
    <Switch>
      <Route
        path="/profile/edit"
        render={ (props) => (
          <Body user={ user } onUserLogout={ onUserLogout }>
            <ProfileEdit
              { ...props }
              updateUser={ updateUser }
              user={ user }
            />
          </Body>
        ) }
      />
      <Route
        path="/profile"
        render={ (props) => (
          <Body user={ user } onUserLogout={ onUserLogout }>
            <Profile
              { ...props }
              user={ user }
            />
          </Body>
        ) }
      />
      <Route
        path="/favorites"
        render={ (props) => (
          <Body user={ user } onUserLogout={ onUserLogout }>
            <Favorites
              { ...props }
            />
          </Body>
        ) }
      />
      <Route
        path="/search"
        render={ (props) => (
          <Body user={ user } onUserLogout={ onUserLogout }>
            <Search
              { ...props }
            />
          </Body>
        ) }
      />
      <Route
        path="/album/:id"
        render={ (props) => (
          <Body user={ user } onUserLogout={ onUserLogout }>
            <Album
              { ...props }
              user={ user }
            />
          </Body>
        ) }
      />
      <Route
        exact
        path="/"
        render={ (props) => (
          <Login
            { ...props }
            createUser={ createUser }
            user={ user }
          />
        ) }
      />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

Routes.propTypes = {
  user: PropTypes.shape({}).isRequired,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  onUserLogout: PropTypes.func.isRequired,
};
