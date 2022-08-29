import React from 'react';
import { PropTypes } from 'prop-types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import AlbumList from './Album/AlbumList';
import * as S from './styles';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      searchingFor: '',
      artist: '',
      result: [],
      isSearchButtonDisabled: true,
      isLoading: false,
    };
  }

  onSearching = ({ target: { name, value } }) => this.setState(
    { [name]: value, isSearchButtonDisabled: value.length < 2 },
  );

  getAlbums = async (event) => {
    event.preventDefault();
    const { searchingFor } = this.state;
    this.setState({ searchingFor: '', artist: searchingFor, isLoading: true });
    const result = await searchAlbumsAPI(searchingFor);
    this.setState({ result, isLoading: false });
  }

  render() {
    const {
      isLoading,
      isSearchButtonDisabled,
      searchingFor,
      result,
      artist,
    } = this.state;
    const {
      history,
    } = this.props;
    return (
      <>
        <S.Form onSubmit={ this.getAlbums }>
          <S.Title text="Vamos sintonizar?" />
          <S.Input
            type="text"
            name="searchingFor"
            label="Artista"
            onChange={ this.onSearching }
            value={ searchingFor }
            placeholder="Insira seu artista preferido"
            helperText="Ao menos 3 caracteres são necessários"
            testid="search-artist-input"
          />
          <S.Button
            type="submit"
            disabled={ isSearchButtonDisabled }
            testid="searc-artist-button"
          >
            Entrar
          </S.Button>
        </S.Form>
        <AlbumList
          isLoading={ isLoading }
          result={ result }
          artist={ artist }
          history={ history }
        />
      </>

    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Home;
