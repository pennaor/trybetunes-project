import React from 'react';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Button from '@mui/material/Button';
import * as S from './styles';
import Loading from '../../components/Loading';

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
      <S.Login>
        { !isLoading ? (
          <S.Form onSubmit={ this.onLoginClickButton }>
            <S.Title text="Login" />
            <S.Input
              type="text"
              name="user"
              placeholder="Insira seu nome ou apelido"
              onChange={ this.onInputChange }
              testid="login-name-input"
            />
            <Button
              variant="outlined"
              type="submit"
              data-testid="login-submit-button"
              disabled={ !loginButtonEnabled }
            >
              Entrar
            </Button>
          </S.Form>
        ) : (<Loading />) }
      </S.Login>
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
