import { useCallback, useRef, useState } from 'react';
import { useDropzone, Dropzone } from 'react-dropzone';

export const ImagePicker = ({ setImages, setVisible }) => {
  console.log('imagePicker rendered');
  // const imageInputRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]);

  const [error, setError] = useState(null);

  // Handle Input Change ------------------------------------------------------------
  // const handleImageInput = e => {
  //   console.log('e', e);
  //   e.stopPropagation();
  //   let files = Array.from(e.target.files);

  //   //  Create preview versions of images
  //   files.forEach(img => {
  //     if (
  //       img.type !== 'image/jpeg' &&
  //       img.type !== 'image/png' &&
  //       img.type !== 'image/webp' &&
  //       img.type !== 'image/gif'
  //     ) {
  //       setError(`${img.name} format is unsupported. Only Jpeg, Png, Webp, Gif are allowed.`);
  //       files = files.filter(item => item.name !== img.name);
  //       return;
  //     } else if (img.size > 1024 * 1024) {
  //       setError(`${img.name} size is too large max 5mb allowed.`);
  //       files = files.filter(item => item.name !== img.name);
  //       return;
  //     } else {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(img);
  //       reader.onload = readerEvent => {
  //         //might have to be .onloadend
  //         setPreviewImages(prev => [...prev, readerEvent.target.result]); //could use reader.result? in case we wont need readerEvent
  //       };
  //     }
  //   });
  //   setImages(prev => [...prev, ...files]);
  // };

  // const handleImageInput = useCallback(e => {
  const onDrop = useCallback(files => {
    console.log('in handleImageInput');
    console.log('e', files);
    let filesArray = Array.from(files);

    //  Create preview versions of images
    filesArray.forEach(img => {
      if (
        img.type !== 'image/jpeg' &&
        img.type !== 'image/png' &&
        img.type !== 'image/webp' &&
        img.type !== 'image/gif'
      ) {
        setError(`${img.name} format is unsupported. Only Jpeg, Png, Webp, Gif are allowed.`);
        filesArray = filesArray.filter(item => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024) {
        setError(`${img.name} size is too large max 5mb allowed.`);
        filesArray = filesArray.filter(item => item.name !== img.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = readerEvent => {
          //might have to be .onloadend
          setPreviewImages(prev => [...prev, readerEvent.target.result]); //could use reader.result? in case we wont need readerEvent
        };
      }
    });
    setImages(prev => [...prev, ...filesArray]);
    // inputRef.current;
  }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   handleImageInput,
  // });

  const { getRootProps, getInputProps, inputRef, rootRef, open } = useDropzone({ onDrop });
  // const { getInputProps, inputRef } = useDropzone({ noDragEventsBubbling: true });

  console.log('prevImages', previewImages);

  const classNames =
    previewImages && previewImages.length > 0
      ? 'image_picker has_images overflow_a scrollbar'
      : 'image_picker';

  return (
    // <div className='image_picker' style={{ height: !images || (images.length === 0 && '26rem') }}>
    // <div className={classNames} >
    // <div {...getRootProps({ refKey: rootRef, className: classNames })}>
    // <Dropzone ref= {imageInputRef} {...getRootProps({ refKey: rootRef, className: classNames })}>
    <div {...getRootProps({ onClick: e => e.stopPropagation(), className: classNames })}>
      {/* <label htmlFor='post_image' onClick={e => e.preventDefault()} /> */}
      {/* <input
        {...getInputProps()}
        ref={imageInputRef}
        id='post_image'
        name='images'
        type='file'
        accept='image/jpeg,image/png,image/webp,image/gif'
        multiple
        hidden
        onChange={handleImageInput}
      /> */}

      <input
        {...getInputProps({
          // ref: imageInputRef,
          // refKey: imageInputRef,
          // refKey: inputRef,

          id: 'post_image',
          name: 'images',
          type: 'file',
          accept: 'image/jpeg,image/png,image/webp,image/gif',
          multiple: true,
          hidden: true,
          // onChange: handleImageInput,
        })}
      />

      {previewImages && previewImages.length > 0 ? (
        // change classsname to top1 ?
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
                  onClick={() => {
                    // imageInputRef.current.click();
                    inputRef.current.click();
                  }}>
                  <i className='addPhoto_icon'></i>
                  Add Photos/Videos
                </button>
              </div>
              <div
                className='small_circle'
                onClick={() => {
                  setPreviewImages([]);
                  setImages([]);
                  setVisible(false);
                }}>
                <i className='exit_icon'></i>
              </div>
            </div>
            <div className='image_grid'>
              {previewImages.map((img, i) => (
                <img src={img} key={i} alt='' />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='add_image_desktop'>
            <div className='top'>
              <div
                className='small_circle'
                onClick={() => {
                  setPreviewImages([]);
                  setImages([]);
                  setVisible(false);
                }}>
                <i className='exit_icon'></i>
              </div>
            </div>
            <div
              className='bottom'
              role='button'
              // onClick={() => {
              //   inputRef.current.click();
              // }}>
              onClick={open}>
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
