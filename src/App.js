import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { getUser } from './services/userAPI';
import './styles/global.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2FC18C',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
    },
  },
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isAuth: false,
    };
  }

  onAuthenticate = (name, bool) => {
    this.setState({ user: name, isAuth: bool });
  }

  fetchUser = async () => {
    const { user } = this.state;
    const result = await getUser({ name: user });
    return result;
  }

  returnLoginComponent = () => (
    <Login
      onAuthenticate={ this.onAuthenticate }
    />
  );

  render() {
    const { isAuth } = this.state;
    return (
      <ThemeProvider theme={ theme }>
        <BrowserRouter>
          <Switch>
            <Route
              path="/profile/edit"
              render={ (props) => (
                <ProfileEdit
                  { ...props }
                  fetchUser={ this.fetchUser }
                />
              ) }
            />
            <Route
              path="/profile"
              render={ (props) => (
                <Profile
                  { ...props }
                  fetchUser={ this.fetchUser }
                />
              ) }
            />
            <Route
              path="/favorites"
              render={ (props) => (
                <Favorites
                  { ...props }
                  fetchUser={ this.fetchUser }
                />
              ) }
            />
            <Route
              path="/search"
              render={ (props) => (
                <Search
                  { ...props }
                  fetchUser={ this.fetchUser }
                />
              ) }
            />
            <Route
              path="/album/:id"
              render={ (props) => (
                <Album
                  { ...props }
                  fetchUser={ this.fetchUser }
                />
              ) }
            />
            <Route exact path="/">
              { isAuth ? <Redirect to="/search" /> : this.returnLoginComponent }
            </Route>
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
