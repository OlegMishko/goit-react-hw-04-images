import { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadMoreButton from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import SearchBar from './Searchbar/Searchbar';
import fetchPics from '../components/service/ApiService';

import { MainPage } from 'common/MainPage.styled';

axios.defaults.baseURL = 'https://pixabay.com/api/';
export default class App extends Component {
  static propTypes = { searchQuery: PropTypes.string };
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    selectedImage: null,
    alt: null,
    status: 'idle',
    error: null,
  };
  totalHits = null;

  // componentDidMount() {
  //   console.log('componentDidMount');
  // }

  async componentDidUpdate(_, prevState) {
    console.log('componentDidUpdate');

    const { page, searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });

      try {
        const imageData = await fetchPics(searchQuery, page);
        this.totalHits = imageData.total;
        const imagesHits = imageData.hits;
        if (!imagesHits.length) {
          toast.warning(
            'No results were found for your search, please try something else.',
            { transition: Zoom, position: 'top-center' }
          );
        }
        this.setState(({ images }) => ({
          images: [...images, ...imagesHits],
          status: 'resolved',
        }));
        if (page > 1) {
          const CARD_HEIGHT = 300;
          window.scrollBy({
            top: CARD_HEIGHT * 2,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        toast.error(`Sorry something went wrong. ${error.message}`);
        this.setState({ status: 'rejected' });
      }
    }
  }

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ searchQuery });
  };

  handleSelectedImage = (largeImageUrl, tags) => {
    this.setState({
      selectedImage: largeImageUrl,
      alt: tags,
    });
  };

  resetState = () => {
    this.setState({
      searchQuery: '',
      page: 1,
      images: [],
      selectedImage: null,
      alt: null,
      status: 'idle',
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  closeModal = () => {
    this.setState({
      selectedImage: null,
    });
  };

  render() {
    const { selectedImage, alt, images, status, error } = this.state;

    return (
      <MainPage>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
        {status === 'pending' && <Loader />}
        {error && (
          <h1 style={{ color: 'orangered', textAlign: 'center' }}>
            {error.message}
          </h1>
        )}
        {images.length > 0 && (
          <ImageGallery
            images={images}
            selectedImage={this.handleSelectedImage}
          />
        )}
        {images.length > 0 && images.length !== this.totalHits && (
          <LoadMoreButton onClick={this.loadMore} />
        )}
        {selectedImage && (
          <Modal
            selectedImage={selectedImage}
            tags={alt}
            onClose={this.closeModal}
          />
        )}
      </MainPage>
    );
  }
}
