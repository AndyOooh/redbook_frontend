import { useContext, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';

import './ChangeImageModal.scss';
import { Modal } from 'components';
import { ImagePicker } from 'components';
import { ImageCropper } from './ImageCropper';
import { ProfileContext } from 'pages/profile/profileContext/profileContext';

export const ChangeImageModal = ({ visible, setVisible, mode }) => {
  const [selectedimage, setSelectedimage] = useState(null);
  const { profileUser } = useContext(ProfileContext);

  const handleExit = () => {
    setSelectedimage(null);
    setVisible(false);
  };

  const handleSelectOldPhoto = image => {
    setSelectedimage(image);
  };

  const isModeCover = mode === 'cover';
  const title = isModeCover ? 'Change Cover Photo' : 'Update profile picture';
  const topic_header1 = isModeCover ? 'Cover Photos' : 'Profile Pictures';
  const topic_header2 = isModeCover ? 'Profile Pictures' : 'Cover Photos';
  const photoArray1 = isModeCover ? profileUser.covers : profileUser.pictures;
  const photoArray2 = isModeCover ? profileUser.pictures : profileUser.covers;
  const photoGridClass1 = isModeCover ? 'cover_photo_grid' : 'profile_photo_grid';
  const photoGridClass2 = isModeCover ? 'profile_photo_grid' : 'cover_photo_grid';

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
              type={mode}
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
                        key={photo.id}
                        src={photo.url}
                        alt=''
                        onClick={() => handleSelectOldPhoto(photo)}
                      />
                    );
                  })}
                </div>
                <button className='btn gray_btn'>See more</button>
              </div>
              <div className='photo_section'>
                <span className='topic_header'>{topic_header2} </span>
                <div className={photoGridClass2}>
                  {photoArray2?.slice(0, 11).map(photo => {
                    return (
                      <img
                        key={photo.id}
                        src={photo.url}
                        alt=''
                        onClick={() => handleSelectOldPhoto(photo)}
                      />
                    );
                  })}
                </div>
                <button className='btn gray_btn'>See more</button>
              </div>
              <div className='photo_section'>
                <span className='topic_header'>Post pictures</span>
                <div className='profile_photo_grid'>
                  {profileUser.postPictures?.map(photo => (
                    <img src={photo.url} key={photo.id} alt='' />
                  ))}
                </div>
                <button className='btn gray_btn'>See more</button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
