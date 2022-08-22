import React from 'react';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box, Container, FormControl, TextField, Typography } from '@mui/material';
import Header from '../components/Header/Header';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loginButtonEnabled: false,
      isLoading: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { user, loginButtonEnabled } = this.state;
      const validate = user.length > 2;
      if (validate !== loginButtonEnabled) {
        this.setState({ loginButtonEnabled: validate });
      }
    });
  }

  onLoginClickButton = (event) => {
    event.preventDefault();
    const { createUser } = this.props;
    this.setState({ isLoading: true }, () => {
      const { user } = this.state;
      createUser(user);
    });
  }

  render() {
    const {
      isLoading,
      loginButtonEnabled,
    } = this.state;
    const {
      user,
    } = this.props;
    return !user.name ? (
      <Container
        maxWidth="sm"
        sx={ {
          bgcolor: 'white',
          mt: '25vh',
          borderRadius: '10px',
        } }
        component="main"
        data-testid="page-login"
        disableGutters
      >
        <Header />
        <Box
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'center',
            border: 1,
            p: 3,
            mx: 'auto',
            boxShadow: '0 3px 5px 2px #2fc18c73',
            borderRadius: '0px 0px 10px 10px',
            borderWidth: '0px 1px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#2ba377',
          } }
        >
          { !isLoading ? (
            <form
              onSubmit={ this.onLoginClickButton }
              style={ { width: 'fit-content', margin: 'auto' } }
            >
              <FormControl
                sx={ { alignItems: 'center' } }
              >
                <Typography variant="h5" component="h1" marginTop={ 1 }>
                  Login
                </Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Usuário"
                  margin="normal"
                  autoFocus
                  name="user"
                  placeholder="Insira seu nome ou apelido"
                  onChange={ this.onInputChange }
                  inputProps={ { 'data-testid': 'login-name-input' } }
                />
                <Button
                  variant="outlined"
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ !loginButtonEnabled }
                >
                  Entrar
                </Button>
              </FormControl>
            </form>
          ) : (<Loading />) }
        </Box>
      </Container>
    ) : (
      <Redirect to="/search" />
    );
  }
}

Login.propTypes = {
  createUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default Login;
