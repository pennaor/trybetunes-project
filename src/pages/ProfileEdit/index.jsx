import React from 'react';
import { PropTypes } from 'prop-types';
import Loading from '../../components/Loading';
import * as S from './styles';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      ...user,
      isLoading: false,
      isEditButtonDisabled: false,
    };
  }

  componentDidMount() {
    this.validateFields();
  }

  isInvalidEmail = (email) => {
    const [user, domain] = email.split('@');
    if (user[0].match(/\d/) || !domain) return true;
    const minimalLength = 3;
    const subDomains = domain.split('.');
    return (
      subDomains.length < 2
      || [user, ...subDomains].some((fragment) => fragment.match(/\W/))
      || user.length < minimalLength
      || subDomains[0].length < minimalLength
      || !subDomains[1].length
    );
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

  onSubmitUser = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true }, this.submitUser);
  }

  submitUser = async () => {
    const {
      name,
      email,
      image,
      description,
    } = this.state;
    const { updateUser, history } = this.props;
    await updateUser({ name, email, image, description });
    this.setState({ isLoading: false }, () => history.push('/profile'));
  }

  render() {
    const {
      name,
      email,
      image,
      description,
      isLoading,
      isEditButtonDisabled,
    } = this.state;
    return !isLoading ? (
      <S.Form
        onSubmit={ this.onSubmitUser }
      >
        <S.Title variant="h5" component="h1" marginY={ 1 }>
          Editar perfil
        </S.Title>
        <S.Input
          label="Nome"
          id="edit-input-name"
          type="text"
          name="name"
          value={ name }
          onChange={ this.onInputChange }
          placeholder="Insira seu nome ou apelido"
          testid="edit-input-name"
        />
        <S.Input
          label="E-mail"
          id="edit-input-email"
          type="email"
          name="email"
          helperText="Formato válido: user@mail.com"
          value={ email }
          onChange={ this.onInputChange }
          placeholder="Insira seu e-mail"
          testid="edit-input-email"
        />
        <S.Input
          label="Foto"
          id="edit-input-image"
          type="text"
          name="image"
          value={ image }
          onChange={ this.onInputChange }
          placeholder="Insira a URL da foto"
          testid="edit-input-image"
        />
        <S.TextArea
          label="Descrição"
          id="edit-input-description"
          type="text"
          name="description"
          value={ description }
          onChange={ this.onInputChange }
          placeholder="Um pouco sobre você"
          testid="edit-input-description"
        />
        <S.Button
          type="submit"
          testid="edit-button-save"
          disabled={ isEditButtonDisabled }
        >
          Editar
        </S.Button>
      </S.Form>
    ) : (
      <Loading />
    );
  }
}

ProfileEdit.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default ProfileEdit;
