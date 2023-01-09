import PropTypes from 'prop-types';
import { GalleryItem, ImageGallery } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ previewImg, tags, selectedImage }) {
  return (
    <GalleryItem>
      <ImageGallery src={previewImg} alt={tags} onClick={selectedImage} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  previewImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  selectedImage: PropTypes.func,
};
