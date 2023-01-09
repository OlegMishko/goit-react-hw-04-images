import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalBody } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    selectedImage: PropTypes.string,
    tags: PropTypes.string,
    onClose: PropTypes.func,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { selectedImage, tags } = this.props;

    return createPortal(
      <ModalOverlay onClick={this.handleBackdropClick}>
        <ModalBody>
          <img src={selectedImage} alt={tags} />
        </ModalBody>
      </ModalOverlay>,
      modalRoot
    );
  }
}
