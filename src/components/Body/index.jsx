import React from 'react';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../Header';
import * as S from './styles';

class Body extends React.Component {
  render() {
    const { children, user, onUserLogout } = this.props;
    return user.name ? (
      <S.Body>
        <Header user={ user } onUserLogout={ onUserLogout } />
        { children }
      </S.Body>
    ) : (
      <Redirect to="/" />
    );
  }
}

Body.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  children: PropTypes.element.isRequired,
  onUserLogout: PropTypes.func.isRequired,
};

Body.defaultProps = {
  user: {},
};

export default Body;
