import React from 'react';
import { PropTypes } from 'prop-types';
import AlbumCard from '../AlbumCard';
import Loading from '../../../../components/Loading';
import * as S from './styles';

export default function AlbumList(props) {
  const { result, artist, isLoading, history } = props;
  if (isLoading) {
    return (<Loading />);
  }
  if (artist) {
    return (
      <S.AlbumList>
        <S.Title>
          {`Resultado de álbuns de: ${artist}`}
        </S.Title>
        { result.length > 0 ? (
          result.map((album) => (
            <AlbumCard
              key={ album.collectionId }
              album={ album }
              history={ history }
            />))
        ) : (
          <S.Message>
            Nenhum álbum foi encontrado
          </S.Message>
        ) }
      </S.AlbumList>
    );
  }
  return null;
}

AlbumList.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
  artist: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
