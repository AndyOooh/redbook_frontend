import React from 'react';

export const ImagePickerUI = ({ previewImages, resetImagePicker, openSystemUi, error, setError }) => {
  const imagePickerClasses =
    previewImages && previewImages.length > 0
      ? // ? 'image_picker has_images overflow_a scrollbar'
        'image_picker overflow_a scrollbar'
      : 'image_picker';

  console.log('error in ImagePickerUI', error);

  const openHandler = () => {
    console.log('openHandler ********************************************************');
    setError(null);
    openSystemUi();
  }

  return (
    <>
      <div className={imagePickerClasses}>
        {previewImages && previewImages.length > 0 ? (
          <>
            <div className='image_preview'>
              <div className='preview_menu'>
                <div className='preview_buttons'>
                  <button className='hover1' type='button'>
                    <i className='edit_icon'></i>
                    Edit
                  </button>
                  <button
                    className='hover1'
                    type='button' // otherwise it will trigger onSubmit
                    onClick={openHandler}>
                    <i className='addPhoto_icon'></i>
                    Add Photos/Videos
                  </button>
                </div>
                <div className='small_circle' onClick={resetImagePicker}>
                  <i className='exit_icon'></i>
                </div>
              </div>
              <div className='image_grid'>
                {previewImages.map(img => (
                  <img src={img.base64} key={img.id} alt='' />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='add_image_desktop'>
              <div className='top'>
                <div className='small_circle' onClick={resetImagePicker}>
                  <i className='exit_icon'></i>
                </div>
              </div>
              <div className='bottom' role='button' onClick={openHandler}>
                <div className='small_circle'>
                  <i className='addPhoto_icon'></i>
                </div>
                <span>Add Photos/Videos</span>
                <span>or drag and drop</span>
              </div>
            </div>
            <div className='add_image_mobile'>
              <div className='mobile_left'>
                <div className='small_circle'>
                  <i className='phone_icon'></i>
                </div>
                <div className='mobile_text'>Add photos from your mobile device.</div>
              </div>
              <span className='addphone_btn'>Add</span>
            </div>
          </>
        )}
      </div>
      {error && (
        <div className='error'>
          <span>{error}</span>
        </div>
      )}
    </>
  );
};
