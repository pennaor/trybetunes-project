import React from 'react';
import { PropTypes } from 'prop-types';
import { Box,
  Container,
  FormControl,
  TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumList from '../components/AlbumList';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchingFor: '',
      searched: '',
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
    this.setState({ searchingFor: '', searched: searchingFor, isLoading: true });
    const result = await searchAlbumsAPI(searchingFor);
    this.setState({ result, isLoading: false });
  }

  redirectToAlbum = (url) => {
    const { history } = this.props;
    history.push(url);
  }

  render() {
    const {
      isLoading,
      isSearchButtonDisabled,
      searchingFor,
      result,
      searched,
    } = this.state;
    const {
      fetchUser,
    } = this.props;
    const textFieldProps = {
      type: 'text',
      name: 'searchingFor',
      label: 'Artista',
      onChange: this.onSearching,
      value: searchingFor,
      placeholder: 'Insira seu artista preferido',
      variant: 'outlined',
      helperText: 'Ao menos 3 caractéres são necessários',
      margin: 'normal',
      autoFocus: true,
      inputProps: { 'data-testid': 'search-artist-input' },
    };
    return (
      <Container
        maxWidth="md"
        sx={ {
          bgcolor: 'white',
          mt: '10px',
          borderRadius: '10px',
        } }
        component="main"
        data-testid="page-search"
        disableGutters
      >
        <Header fetchUser={ fetchUser } />
        <Box
          padding={ 3 }
          sx={ {
            borderRadius: '0px 0px 10px 10px',
            borderWidth: '0px 1px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#2ba377',
          } }
        >
          <form
            onSubmit={ this.getAlbums }
            style={ { width: 'fit-content', margin: 'auto' } }
          >
            <FormControl
              sx={ { alignItems: 'center' } }
            >
              <Typography variant="h5" component="h1" marginTop={ 1 }>
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
          { !isLoading ? (
            <AlbumList
              result={ result }
              searched={ searched }
              redirectToAlbum={ this.redirectToAlbum }
            />
          ) : (
            <Loading />
          ) }
        </Box>

      </Container>
    );
  }
}

Search.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Search;
