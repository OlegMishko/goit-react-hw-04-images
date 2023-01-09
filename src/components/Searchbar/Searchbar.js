import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import {
  HeaderSearchbar,
  SearchbarForm,
  SearchFormButton,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.error('Please enter something');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <HeaderSearchbar>
        <SearchbarForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </SearchbarForm>
      </HeaderSearchbar>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
