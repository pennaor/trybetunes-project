import React from 'react';
import { PropTypes } from 'prop-types';
import Logo from './Logo';
import Navigation from './Navigation';
import * as S from './styles';

class Header extends React.Component {
  render() {
    const { user, onUserLogout } = this.props;
    return (
      <S.Header user={ user }>
        <Logo />
        { user.name && (
          <>
            <S.User
              userName={ user.name }
              onUserLogout={ onUserLogout }
            />
            <Navigation />
          </>
        ) }
      </S.Header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  onUserLogout: PropTypes.func,
};

Header.defaultProps = {
  user: {},
  onUserLogout: () => null,
};

export default Header;
