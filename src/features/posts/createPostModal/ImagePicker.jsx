import { useRef, useState } from 'react';

export const ImagePicker = ({ images, setImages }) => {
  const imageInputRef = useRef(null);

  // const [previewImages, setPreviewImages] = useState([]);

  const [error, setError] = useState(null);

  const handleImages = e => {
    const file = e.target.files[0];
    setImages(state => [...state, file]);

    console.log('file', file);


    // let files = Array.from(e.target.files);
    // files.forEach(img => {
    //   console.log(img);
    //   if (
    //     img.type !== 'image/jpeg' &&
    //     img.type !== 'image/png' &&
    //     img.type !== 'image/webp' &&
    //     img.type !== 'image/gif'
    //   ) {
    //     setError(`${img.name} format is unsupported. Only Jpeg, Png, Webp, Gif are allowed.`);

    //     files = files.filter(item => item.name !== img.name);
    //     return;
    //   } else if (img.size > 1024 * 1024) {
    //     setError(`${img.name} size is too large max 5mb allowed.`);
    //     files = files.filter(item => item.name !== img.name);
    //     return;
    //   } else {
    //     // setImages([...images, ...files]);

    //     // const reader = new FileReader();
    //     // reader.readAsDataURL(img);
    //     // reader.onload = readerEvent => { //might have to be .onloadend
    //     //   setImages(images => [...images, readerEvent.target.result]); //could use reader.result? in case we wont need readerEvent
    //     // };
    //   }
    // });
  };

  const classNames =
    images && images.length > 0 ? 'image_picker has_images overflow_a scrollbar' : 'image_picker';

  return (
    // <div className='image_picker' style={{ height: !images || (images.length === 0 && '26rem') }}>
    <div className={classNames}>
      <label htmlFor='post_image' />
      <input
        type='file'
        id='post_image'
        name='images'
        accept='image/jpeg,image/png,image/webp,image/gif'
        multiple
        hidden
        ref={imageInputRef}
        onChange={handleImages}
      />

      {images && images.length > 0 ? (
        // change classsname to top1 ?
        <>
          <div className='image_preview'>
            <div className='preview_menu'>
              <div className='preview_buttons'>
                <button className='hover1'>
                  <i className='edit_icon'></i>
                  Edit
                </button>
                <button
                  className='hover1'
                  onClick={() => {
                    imageInputRef.current.click();
                  }}>
                  <i className='addPhoto_icon'></i>
                  Add Photos/Videos
                </button>
              </div>
              <div
                className='small_circle'
                onClick={() => {
                  setImages([]);
                }}>
                <i className='exit_icon'></i>
              </div>
            </div>
            <div className='image_grid'>
              {/* {images.map((img, i) => (
                <img src={img} key={i} alt='' />
                ))} */}
              <img src={images} alt='' />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='add_image_desktop'>
            <div className='top'>
              <div className='small_circle'>
                <i className='exit_icon'></i>
              </div>
            </div>
            <div
              className='bottom'
              onClick={() => {
                imageInputRef.current.click();
              }}>
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
  );
};
