import React from 'react';
import { PropTypes } from 'prop-types';
import { FormControl, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import AlbumList from '../../components/Album/AlbumList';

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
    const textFieldProps = {
      type: 'text',
      name: 'searchingFor',
      label: 'Artista',
      onChange: this.onSearching,
      value: searchingFor,
      placeholder: 'Insira seu artista preferido',
      variant: 'outlined',
      helperText: 'Ao menos 3 caracteres são necessários',
      margin: 'normal',
      autoFocus: true,
      inputProps: { 'data-testid': 'search-artist-input' },
    };
    return (
      <>
        <form
          onSubmit={ this.getAlbums }
          style={ { width: 'fit-content', margin: 'auto' } }
        >
          <FormControl
            sx={ { alignItems: 'center' } }
          >
            <Typography variant="h5" component="h1" marginY={ 1 }>
              Vamos sintonizar?
            </Typography>
            <TextField { ...textFieldProps } />
            <Button
              variant="outlined"
              type="submit"
              data-testid="search-artist-button"
              disabled={ isSearchButtonDisabled }
            >
              Procurar
            </Button>
          </FormControl>
        </form>
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
