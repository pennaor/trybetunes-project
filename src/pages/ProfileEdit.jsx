import React from 'react';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Box, Container, FormControl, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      ...user,
      isLoading: false,
      isEditButtonDisabled: false,
      redirectToProfile: false,
    };
  }

  componentDidMount() {
    const { onUserAuthenticate } = this.props;
    onUserAuthenticate();
  }

  isInvalidEmail = (email) => {
    const [user, domain] = email.split('@');
    if (!domain) return true;
    const subDomains = domain.split('.');
    const minimalLength = 4;
    if (
      subDomains.length < 2
      || [user, ...subDomains].some((fragment) => fragment.match(/\W/))
      || user.length < minimalLength
      || subDomains[0].length < minimalLength
      || !subDomains[1].length
    ) return true;
    return false;
  }

  validateFields = () => {
    const {
      isEditButtonDisabled,
      name,
      email,
      description,
    } = this.state;
    const someIsEmpty = [name, email, description].some((value) => !value.length);
    const disable = someIsEmpty || this.isInvalidEmail(email);
    if (isEditButtonDisabled !== disable) {
      this.setState({ isEditButtonDisabled: disable });
    }
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateFields());
  }

  submitUser = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true }, this.updateUser);
  }

  updateUser = async () => {
    const {
      name,
      email,
      image,
      description,
    } = this.state;
    const { onUserAuthenticate } = this.props;
    await updateUser({ name, email, image, description });
    await onUserAuthenticate();
    this.setState({ isLoading: false, redirectToProfile: true });
  }

  render() {
    const {
      name,
      email,
      image,
      description,
      isLoading,
      isEditButtonDisabled,
      redirectToProfile,
    } = this.state;
    const {
      user,
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
        data-testid="page-profile-edit"
        disableGutters
      >
        <Header user={ user } />
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
          { redirectToProfile && <Redirect to="/profile" /> }
          { !isLoading ? (
            <form
              onSubmit={ this.submitUser }
              style={ { width: 'fit-content', margin: 'auto' } }
            >
              <FormControl
                sx={ { alignItems: 'center' } }
              >
                <Typography variant="h5" component="h1" marginY={ 1 }>
                  Editar perfil
                </Typography>
                <TextField
                  label="Nome"
                  id="edit-input-name"
                  type="text"
                  name="name"
                  value={ name }
                  onChange={ this.onInputChange }
                  variant="outlined"
                  margin="normal"
                  placeholder="Insira seu nome ou apelido"
                  inputProps={ { 'data-testid': 'edit-input-name' } }
                />
                <TextField
                  label="E-mail"
                  id="edit-input-email"
                  type="email"
                  name="email"
                  value={ email }
                  onChange={ this.onInputChange }
                  variant="outlined"
                  margin="normal"
                  placeholder="Insira seu e-mail"
                  inputProps={ { 'data-testid': 'edit-input-email' } }
                />
                <TextField
                  label="Foto"
                  id="edit-input-image"
                  type="text"
                  name="image"
                  value={ image }
                  onChange={ this.onInputChange }
                  variant="outlined"
                  margin="normal"
                  placeholder="Insira a URL da foto"
                  inputProps={ { 'data-testid': 'edit-input-image' } }
                />
                <TextField
                  label="Descrição"
                  id="edit-input-description"
                  type="text"
                  name="description"
                  value={ description }
                  onChange={ this.onInputChange }
                  multiline
                  rows={ 4 }
                  variant="outlined"
                  margin="normal"
                  placeholder="Um pouco sobre você"
                  inputProps={ { 'data-testid': 'edit-input-description' } }
                />
                <Button
                  variant="outlined"
                  type="submit"
                  data-testid="edit-button-save"
                  disabled={ isEditButtonDisabled }
                >
                  Editar
                </Button>
              </FormControl>
            </form>
          ) : (
            <Loading />
          ) }
        </Box>
      </Container>
    );
  }
}

ProfileEdit.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default ProfileEdit;
