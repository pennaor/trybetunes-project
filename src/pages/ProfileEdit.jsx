import React from 'react';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      isLoading: true,
      isEditButtonDisabled: false,
      redirectToProfile: false,
    };
  }

  componentDidMount() {
    this.getProfileInformation();
  }

  getProfileInformation = async () => {
    const { fetchUser } = this.props;
    const user = await fetchUser();
    this.setState({ ...user, isLoading: false });
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
      email,
      isEditButtonDisabled,
    } = this.state;
    const someIsEmpty = Object.values(this.state).some(
      (value) => typeof value === 'string' && !value.length,
    );
    const disable = someIsEmpty || this.isInvalidEmail(email);
    if (isEditButtonDisabled !== disable) {
      this.setState({ isEditButtonDisabled: disable });
    }
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateFields());
  }

  updateUser = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true }, async () => {
      const {
        name,
        email,
        image,
        description,
      } = this.state;
      await updateUser({ name, email, image, description });
      this.setState({ isLoading: false, redirectToProfile: true });
    });
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
      fetchUser,
    } = this.props;
    return (
      <div data-testid="page-profile-edit">
        { redirectToProfile && <Redirect to="/profile" /> }
        <Header fetchUser={ fetchUser } />
        <h3>Editar perfil</h3>
        { !isLoading ? (
          <form onSubmit={ this.updateUser }>
            <label htmlFor="edit-input-name">
              Nome
              <input
                id="edit-input-name"
                type="text"
                name="name"
                value={ name }
                onChange={ this.onInputChange }
                data-testid="edit-input-name"
              />
            </label>
            <label htmlFor="edit-input-email">
              E-mail
              <input
                id="edit-input-email"
                type="text"
                name="email"
                value={ email }
                onChange={ this.onInputChange }
                data-testid="edit-input-email"
              />
            </label>
            <label htmlFor="edit-input-image">
              Foto
              <Icon>add_a_photo</Icon>
              <input
                id="edit-input-image"
                type="text"
                name="image"
                value={ image }
                onChange={ this.onInputChange }
                data-testid="edit-input-image"
              />
            </label>
            <label htmlFor="edit-input-description">
              Descrição
              <input
                id="edit-input-description"
                type="text"
                name="description"
                value={ description }
                onChange={ this.onInputChange }
                data-testid="edit-input-description"
              />
            </label>
            <Button
              variant="contained"
              type="submit"
              disabled={ isEditButtonDisabled }
              data-testid="edit-button-save"
            >
              Editar
            </Button>
          </form>
        ) : (
          <Loading />
        ) }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

export default ProfileEdit;
