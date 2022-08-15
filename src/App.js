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
import Loading from './components/Loading';

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
      user: {},
      isAppLoading: true,
      isRefreshingUser: false,
    };
  }

  componentDidMount() {
    this.onUserAuthenticate();
  }

  onUserAuthenticate = async (callback) => {
    this.setState({ isRefreshingUser: true });
    const user = await getUser();
    this.setState({ user, isAppLoading: false, isRefreshingUser: false }, callback);
  }

  checkAuthentication = (component) => {
    const { user } = this.state;
    return user.name ? component : (<Redirect to="/" />);
  }

  render() {
    const { user, isAppLoading, isRefreshingUser } = this.state;
    return (
      <ThemeProvider theme={ theme }>
        <BrowserRouter>
          { !isAppLoading ? (
            <Switch>
              <Route
                path="/profile/edit"
                render={ (props) => (
                  this.checkAuthentication(
                    <ProfileEdit
                      { ...props }
                      onUserAuthenticate={ this.onUserAuthenticate }
                      user={ user }
                      isRefreshingUser={ isRefreshingUser }
                    />,
                  )
                ) }
              />
              <Route
                path="/profile"
                render={ (props) => (
                  this.checkAuthentication(
                    <Profile
                      { ...props }
                      onUserAuthenticate={ this.onUserAuthenticate }
                      user={ user }
                      isRefreshingUser={ isRefreshingUser }
                    />,
                  )
                ) }
              />
              <Route
                path="/favorites"
                render={ (props) => (
                  this.checkAuthentication(
                    <Favorites
                      { ...props }
                      onUserAuthenticate={ this.onUserAuthenticate }
                      user={ user }
                      isRefreshingUser={ isRefreshingUser }
                    />,
                  )
                ) }
              />
              <Route
                path="/search"
                render={ (props) => (
                  this.checkAuthentication(
                    <Search
                      { ...props }
                      onUserAuthenticate={ this.onUserAuthenticate }
                      user={ user }
                      isRefreshingUser={ isRefreshingUser }
                    />,
                  )
                ) }
              />
              <Route
                path="/album/:id"
                render={ (props) => (
                  this.checkAuthentication(
                    <Album
                      { ...props }
                      onUserAuthenticate={ this.onUserAuthenticate }
                      user={ user }
                      isRefreshingUser={ isRefreshingUser }
                    />,
                  )
                ) }
              />
              <Route
                exact
                path="/"
                render={ (props) => (
                  <Login
                    { ...props }
                    onUserAuthenticate={ this.onUserAuthenticate }
                    user={ user }
                  />
                ) }
              />
              <Route path="*" component={ NotFound } />
            </Switch>
          ) : (
            <Loading />
          ) }
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
