import React from 'react';
import Header from './header';

class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      photos: []
    };
    this.onUploadSubmit = this.onUploadSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onUploadSubmit(event) {
    event.preventDefault();
    const { file, photos } = this.state;
    const uploadingPhoto = new FormData();
    uploadingPhoto.append('userPhoto', file);

    fetch('/api/upload-image', {
      method: 'POST',
      body: uploadingPhoto
    })
      .then(res => res.json())
      .then(data => {
        console.log('data: ', data);
        // const test = photos.push(data);
        // this.setState({photos: test})
      })
      .catch(err => console.error(err));
  }

  onChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  render() {
    return (
      <div
        className='container bg-account'>
        <Header title='Upload Photo' history={this.props.history} back={true} />
        <div
          className='d-flex justify-content-center align-items-center m-3 mt-5'
          style={{ height: '40%', width: '90%', border: '1px solid black' }}>
          <img src={this.state.photos[0]}/>
        </div>

        <form className='' onSubmit={this.onUploadSubmit}>
          <h3 className=''>
            Upload Photo
          </h3>
          <input name='userPhoto' type='file' onChange={this.onChange}/>
          <button className='btn btn-primary' type='submit'>
            SUBMIT
          </button>
        </form>

      </div>
    );
  }
}

export default UploadPhoto;

// remember to add onSubmit={} inside the form tag
// remember to add an onChange={} inside the input tag
