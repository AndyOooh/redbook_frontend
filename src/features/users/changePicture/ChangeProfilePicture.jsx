import { Modal } from 'components';
// import { ImagePicker } from 'features/posts/createPostModal/ImagePicker';
import { ImagePicker } from 'features/posts/createPostModal/ImagePicker';
import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';

import './ChangeProfilePicture.scss';
import { ChangeProfilePopup } from './ChangeProfilePopup';

export const ChangeProfilePicture = ({ visible, setVisible }) => {
  // setShow is a placeholder

  // const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedimage, setSelectedimage] = useState(null);
  const [selectedimagePreview, setSelectedimagePreview] = useState(null);
  console.log("🚀 ~ file: ChangeProfilePicture.jsx ~ line 16 ~ ChangeProfilePicture ~ selectedimagePreview", selectedimagePreview)

  const suggestedPhotos = [
    'https://pbs.twimg.com/media/EosHCHJXEAIfa7H?format=jpg&name=4096x4096',
    'https://i.pinimg.com/736x/69/d0/cb/69d0cbd0f6b91fce72cbe446d85cfbae--sexy-women-sexy-girls.jpg',
    'https://f5bulous.files.wordpress.com/2013/02/hot-chick.jpg',
    'https://pbs.twimg.com/media/EosHCHJXEAIfa7H?format=jpg&name=4096x4096',
  ];

  const uploads = [
    'https://pbs.twimg.com/media/EosHCHJXEAIfa7H?format=jpg&name=4096x4096',
    'https://i.pinimg.com/736x/69/d0/cb/69d0cbd0f6b91fce72cbe446d85cfbae--sexy-women-sexy-girls.jpg',
    'https://f5bulous.files.wordpress.com/2013/02/hot-chick.jpg',
    'https://pbs.twimg.com/media/EosHCHJXEAIfa7H?format=jpg&name=4096x4096',
  ];

  const handleExit = () => {
    setSelectedimage(null);
    setSelectedimagePreview(null);
    setVisible(false);
  };

  return (
    <Modal className='change_profile_pic' visible={visible} setVisible={setVisible}>
      <div className='card_main'>
        <div className='top'>
          <span className='card_title'>Update profile picture</span>
          {/* <div className='small_circle' onClick={() => setVisible(false)}> */}
          <div className='small_circle' onClick={handleExit}>
            <i className='exit_icon'></i>
          </div>
        </div>

        <div className='bottom'>
          {selectedimagePreview ? (
            <ChangeProfilePopup
              image={selectedimage}
              setImage={setSelectedimage}
              imagePreview={selectedimagePreview}
              setImagePreview={setSelectedimagePreview}
            />
          ) : (
            <>
              <ImagePicker
                multiple={false}
                setImage={setSelectedimage}
                setPreviewImage={setSelectedimagePreview}>
                {props => (
                  <>
                    <div className='row_buttons'>
                      <button
                        className='btn red_btn'
                        onClick={() => {
                          props.open();
                          props.setError(null);
                        }}>
                        <BsPlusLg /> Upload photo
                      </button>
                      <button className='btn '>
                        <i className='frame_icon'></i>
                        Add frame
                      </button>
                    </div>
                    {props.error && <div className='error'>{props.error}</div>}
                  </>
                )}
              </ImagePicker>
              {/* <button className='btn red_btn'></button> */}
              <div className='photo_section'>
                <span className='topic_header'>Suggested photos</span>
                <div className='photo_grid'>
                  {suggestedPhotos.map(photo => (
                    // <img src={photo.base64} key={photo.id} alt='' />
                    <img src={photo} key={photo.id} alt='' />
                  ))}
                </div>
                <button className='btn btn_grey'>See more</button>
              </div>
              <div className='photo_section'>
                <span className='topic_header'>Uploads</span>
                <div className='photo_grid'>
                  {uploads.map(photo => (
                    // <img src={photo.base64} key={photo.id} alt='' />
                    <img src={photo} key={photo.id} alt='' />
                  ))}
                </div>
                <button className='btn btn_grey'>See more</button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
