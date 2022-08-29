import { Modal } from 'components';
import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

export const ChangeProfilePopup = ({ selectedimage, selectedimagePreview }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  console.log('selectedimage', selectedimage);
  console.log('selectedimagePreview', selectedimagePreview);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  return (
    <>
      <div className='postBox update_img'>
        <div className='box_header'>
          <div className='small_circle' onClick={() => setImage('')}>
            <i className='exit_icon'></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className='update_image_desc'>
          <textarea
            placeholder='Description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='textarea_blue details_input'></textarea>
        </div>

        <div className='update_center'>
          <div className='crooper'>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              cropShape='round'
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              showGrid={false}
            />
          </div>
          <div className='slider'>
            <div className='slider_circle hover1' onClick={() => zoomOut()}>
              <i className='minus_icon'></i>
            </div>
            <input
              type='range'
              min={1}
              max={3}
              step={0.2}
              ref={slider}
              value={zoom}
              onChange={e => setZoom(e.target.value)}
            />
            <div className='slider_circle hover1' onClick={() => zoomIn()}>
              <i className='plus_icon'></i>
            </div>
          </div>
        </div>
        <div className='flex_up'>
          <div className='gray_btn' onClick={() => getCroppedImage('show')}>
            <i className='crop_icon'></i>Crop photo
          </div>
          <div className='gray_btn'>
            <i className='temp_icon'></i>Make Temporary
          </div>
        </div>
        <div className='flex_p_t'>
          <i className='public_icon'></i>
          Your profile picture is public
        </div>
        <div className='update_submit_wrap'>
          <div className='blue_link' onClick={() => setImage('')}>
            Cancel
          </div>
          <button className='blue_btn' disabled={loading} onClick={() => updateProfielPicture()}>
            {loading ? <PulseLoader color='#fff' size={5} /> : 'Save'}
          </button>
        </div>
      </div>
    </>

    // <div className='card_main image_selector'>
    //   <div className='top'>
    //     <span className='card_title'>Update profile picture</span>
    //     <div
    //       className='small_circle'
    //       // onClick={setShow}
    //     >
    //       <i className='exit_icon'></i>
    //     </div>
    //   </div>
    //   <div className='description'>
    //     <textarea rows={5} placeholder='Description' />
    //   </div>
    //   <div className='image_cropper'>
    //     {' '}
    //     <Cropper
    //       image={selectedimagePreview[0].base64}
    //       crop={crop}
    //       zoom={zoom}
    //       aspect={4 / 3}
    //       onCropChange={setCrop}
    //       onCropComplete={onCropComplete}
    //       onZoomChange={setZoom}
    //     />
    //   </div>

    //   <h1>Popup Popup Popup Popup</h1>
    // </div>
  );
};
