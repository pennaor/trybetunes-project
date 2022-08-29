import React from 'react';
import * as S from './styles';

class NotFound extends React.Component {
  render() {
    return (
      <S.NotFound>
        <S.Message>
          404 - Not Found
        </S.Message>
      </S.NotFound>
    );
  }
}

export default NotFound;
