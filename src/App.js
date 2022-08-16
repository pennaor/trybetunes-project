import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import {
  getUser as getUserAPI,
  createUser as createUserAPI,
  updateUser as updateUserAPI,
} from './services/userAPI';
import './styles/global.css';
import Body from './components/Body';
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
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const user = await getUserAPI();
    this.setState({ user, isAppLoading: false });
  }

  createUser = async (user) => {
    await createUserAPI({ name: user });
    this.getUser();
  }

  updateUser = async (user) => {
    await updateUserAPI(user);
    await this.getUser();
  }

  render() {
    const { user, isAppLoading } = this.state;
    return (
      <ThemeProvider theme={ theme }>
        { !isAppLoading ? (
          <Switch>
            <Route
              path="/profile/edit"
              render={ (props) => (
                <Body user={ user }>
                  <ProfileEdit
                    { ...props }
                    updateUser={ this.updateUser }
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
                  createUser={ this.createUser }
                  user={ user }
                />
              ) }
            />
            <Route path="*" component={ NotFound } />
          </Switch>
        ) : (
          <Loading />
        ) }
      </ThemeProvider>
    );
  }
}

export default App;
