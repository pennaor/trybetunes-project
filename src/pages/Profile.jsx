import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getProfileInformation();
  }

  getProfileInformation = async () => {
    const { fetchUser } = this.props;
    const user = await fetchUser();
    this.setState({ user, isLoading: false });
  }

  render() {
    const {
      user: { name, email, image, description },
      isLoading,
    } = this.state;
    const {
      fetchUser,
    } = this.props;
    return (
      <div data-testid="page-profile">
        <Header fetchUser={ fetchUser } />
        { !isLoading ? (
          <>
            <h4>Nome</h4>
            <p>{ name }</p>
            <img src={ image } alt={ `Foto de ${name}` } data-testid="profile-image" />
            <h4>E-mail</h4>
            <p>{ email }</p>
            <h4>Descrição</h4>
            <p>{ description }</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </>
        ) : (
          <Loading />
        ) }
      </div>
    );
  }
}

Profile.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

export default Profile;
