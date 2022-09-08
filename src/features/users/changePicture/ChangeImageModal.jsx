import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';

import './ChangeImageModal.scss';
import { Modal } from 'components';
import { ImagePicker } from 'components';
import { ImageCropper } from './ImageCropper';

export const ChangeImageModal = ({ user, visible, setVisible, type }) => {
  const [selectedimage, setSelectedimage] = useState(null);

  console.log('🚀 ~ file: ChangeImageModal.jsx ~ line 10 ~ type', type);

  const uploads = [
    'https://pbs.twimg.com/media/EosHCHJXEAIfa7H?format=jpg&name=4096x4096',
    'https://i.pinimg.com/736x/69/d0/cb/69d0cbd0f6b91fce72cbe446d85cfbae--sexy-women-sexy-girls.jpg',
    'https://f5bulous.files.wordpress.com/2013/02/hot-chick.jpg',
    'https://pbs.twimg.com/media/EosHCHJXEAIfa7H?format=jpg&name=4096x4096',
  ];

  const handleExit = () => {
    setSelectedimage(null);
    setVisible(false);
  };

  const handleSelectOldPhoto = image => {
    setSelectedimage(image);
  };

  let title;
  let topic_header1;
  let topic_header2;
  let photoArray1;
  let photoArray2;
  let photoGridClass1;
  let photoGridClass2;

  if (type === 'cover') {
    title = 'Change Cover Photo';
    topic_header1 = 'Cover Photos';
    topic_header2 = 'Profile Pictures';
    photoArray1 = user.covers;
    photoArray2 = user.pictures;
    photoGridClass1 = 'cover_photo_grid';
    photoGridClass2 = 'profile_photo_grid';
  } else if (type === 'profile') {
    title = 'Update profile picture';
    topic_header1 = 'Profile Pictures';
    topic_header2 = 'Cover Photos';
    photoArray1 = user.pictures;
    photoArray2 = user.covers;
    photoGridClass1 = 'profile_photo_grid';
    photoGridClass2 = 'cover_photo_grid';
  }

  return (
    <Modal className='change_profile_pic' visible={visible} setVisible={setVisible}>
      <div className='card_main'>
        <div className='top'>
          <span className='card_title'>{title} </span>
          <div className='small_circle' onClick={handleExit}>
            <i className='exit_icon'></i>
          </div>
        </div>

        <div className='bottom scrollbar'>
          {selectedimage?.url ? (
            <ImageCropper
              image={selectedimage}
              setImage={setSelectedimage}
              setParentVisible={setVisible}
              type={type}
            />
          ) : (
            <>
              <ImagePicker multiple={false} preview setImage={setSelectedimage}>
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
              <div className='photo_section'>
                <span className='topic_header'>{topic_header1} </span>
                <div className={photoGridClass1}>
                  {photoArray1?.slice(1, 12).map(photo => {
                    return (
                      <img
                        src={photo.url}
                        key={photo.id}
                        alt=''
                        onClick={() => handleSelectOldPhoto(photo)}
                      />
                    );
                  })}
                </div>
                <button className='btn btn_grey'>See more</button>
              </div>
              <div className='photo_section'>
                <span className='topic_header'>{topic_header2} </span>
                <div className={photoGridClass2}>
                  {photoArray2?.slice(0, 11).map(photo => {
                    return (
                      <img
                        src={photo.url}
                        key={photo.id}
                        alt=''
                        onClick={() => handleSelectOldPhoto(photo)}
                      />
                    );
                  })}
                </div>
                <button className='btn btn_grey'>See more</button>
              </div>
              <div className='photo_section'>
                <span className='topic_header'>Post pictures</span>
                <div className='profile_photo_grid'>
                  {/* find all post pics */}
                  {uploads.map(photo => (
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
