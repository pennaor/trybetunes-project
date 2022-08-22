import React from 'react';
import PropType from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';
import Body from './Body';

export default function Routes({ user, createUser, updateUser }) {
  return (
    <Switch>
      <Route
        path="/profile/edit"
        render={ (props) => (
          <Body user={ user }>
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
          <Body user={ user }>
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
          <Body user={ user }>
            <Favorites
              { ...props }
            />
          </Body>
        ) }
      />
      <Route
        path="/search"
        render={ (props) => (
          <Body user={ user }>
            <Search
              { ...props }
            />
          </Body>
        ) }
      />
      <Route
        path="/album/:id"
        render={ (props) => (
          <Body user={ user }>
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
  user: PropType.shape({}).isRequired,
  createUser: PropType.func.isRequired,
  updateUser: PropType.func.isRequired,
};
