import React from 'react';
import { PropTypes } from 'prop-types';
import * as S from './styles';

class Profile extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <S.Profile>
        <S.UserPhoto
          image={ user.image }
          name={ user.name }
        />
        <S.UserEmail
          email={ user.email }
          name={ user.name }
        />
        <S.UserDescription
          description={ user.description }
        />
      </S.Profile>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Profile;
