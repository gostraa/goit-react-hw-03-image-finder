import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { fetchImages } from '../../fetch.js';
import styles from './ImageGallery.module.css';
import { Button } from 'components/Button/Button.jsx';

export class ImageGallery extends Component {
  state = {
    images: [],
  };

  renderImages() {
    const { inputValue, page } = this.props;
    fetchImages(inputValue, page).then(response => {
      if (response.totalHits === 0) {
        toast('нажаль,нічого не знайдено 🥺');
        return;
      }
      console.log(response);
      this.setState({ images: response.hits }).catch(error =>
        console.log(error)
      );
    });
  }

  componentDidUpdate(prevProps, _) {
    if (prevProps.inputValue !== this.props.inputValue) {
      this.renderImages();
    }
  }

  render() {
    return (
      <>
        <ul className={styles['ImageGallery']}>
          {this.state.images.map(({ id, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              url={largeImageURL}
              tags={tags}
              onClick={this.props.onClick}
            />
          ))}
        </ul>
        {this.state.images.length !== 0 ? (
          <Button onClick={this.props.loadMore} />
        ) : (
          console.log('no')
        )}
      </>
    );
  }
}
