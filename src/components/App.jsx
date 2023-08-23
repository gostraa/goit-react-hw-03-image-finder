import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    inputValue: '',
    page: 1,
  };

  getInputValue = value => {
    this.setState({ inputValue: value });
  };

  onClickLoadMore() {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.getInputValue} />
        <ImageGallery
          loadMore={this.onClickLoadMore}
          inputValue={this.state.inputValue}
          page={this.state.page}
        />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
