import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  getUser as getUserAPI,
  createUser as createUserAPI,
  updateUser as updateUserAPI,
  logoutUser as logoutUserAPI,
} from './services/userAPI';
import './styles/global.css';
import Loading from './components/Loading';
import Routes from './components/Routes';

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
    await this.getUser();
  }

  updateUser = async (user) => {
    await updateUserAPI(user);
    await this.getUser();
  }

  onUserLogout = async () => {
    this.setState({ isAppLoading: true });
    await logoutUserAPI();
    await this.getUser();
  }

  render() {
    const { user, isAppLoading } = this.state;
    return (
      <ThemeProvider theme={ theme }>
        { !isAppLoading ? (
          <Routes
            user={ user }
            createUser={ this.createUser }
            updateUser={ this.updateUser }
            onUserLogout={ this.onUserLogout }
          />
        ) : (
          <Loading />
        ) }
      </ThemeProvider>
    );
  }
}

export default App;
