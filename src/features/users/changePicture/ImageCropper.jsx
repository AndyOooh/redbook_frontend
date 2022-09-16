import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cropper from 'react-easy-crop';
import { DotLoader } from 'react-spinners';

import { useUpdateProfileImagesMutation } from '../usersApiSlice';
import { updateUser } from 'features/auth/authSlice';
import { getCroppedImg } from 'utils/getCroppedImg';
import { useCreatePostMutation } from 'features/posts/postsApiSlice';

export const ImageCropper = ({ image, setImage, setParentVisible, type }) => {
  console.log('🚀 ~ file: ImageCropper.jsx ~ line 11 ~ type', type);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  const [text, setText] = useState('');
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleZoom = direction => {
    direction === 'in' ? sliderRef.current.stepUp() : sliderRef.current.stepDown();
    setZoom(sliderRef.current.value);
  };

  const onCropComplete = useCallback((croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const [updateProfileImages, { isLoading: updateImageIsLoading, isSucces, error }] =
    useUpdateProfileImagesMutation();
  const [createPost, { isLoading: createPostIsLoading }] = useCreatePostMutation();
  const isLoading = updateImageIsLoading || createPostIsLoading;

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      const isCropped = crop.x !== 0 || crop.y !== 0 || zoom !== 1;

      let postData = new FormData();
      postData.append('text', text);
      postData.append('image', JSON.stringify(image));
      // postData.append('type', type);
      if (!image.usedBefore || isCropped) {
        // images will be cropped if they are new or if they are cropped
        const { croppedFileFromDataUrl } = await getCroppedImg(image.url, croppedArea);
        postData.set('image', croppedFileFromDataUrl);
      }

      try {
        const newImageArray = await updateProfileImages({
          postData,
          type,
          userId: user.id,
        }).unwrap();

        postData.set('image', JSON.stringify(newImageArray[0]));
        const { data } = await createPost({ postData, type }).unwrap();
        console.log('🚀 ~ file: ImageCropper.jsx ~ line 61 ~ data', data);

        const payload =
          type === 'profile' ? { pictures: newImageArray } : { covers: newImageArray }; // shouldnt it be pictures/covers: [...newImageArray]? seems like its working without it

        dispatch(updateUser(payload)); //could alse have ref to cover/profilepic and set the bg pic for that with ref.current.style.backgroundImage = `url(${newImageArray[0].url})`
        setParentVisible(false); // doesnt rerender Profile. Even if it does I'm not sure Profile refetches the user data.
      } catch (error) {
        console.log('🚀 ~ error', error);
      }
    },
    [
      text,
      updateProfileImages,
      user.id,
      setParentVisible,
      image,
      dispatch,
      crop.x,
      crop.y,
      zoom,
      croppedArea,
      type,
      createPost,
    ]
  );

  return (
    <>
      <div className='text'>
        <textarea placeholder='Description' value={text} onChange={e => setText(e.target.value)} />
      </div>
      <div className='image_cropper'>
        <Cropper
          image={image.url}
          crop={crop}
          zoom={zoom}
          aspect={type === 'profile' ? 1 / 1 : 2.7 / 1} // 2.7 is the aspect ratio of the cover photo wrapper
          cropShape={type === 'profile' ? 'round' : 'rect'}
          onZoomChange={setZoom}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          restrictPosition={false}
          showGrid={false}
          objectFit='auto-cover'
        />
        {/* 'contain', 'horizontal-cover', 'vertical-cover' or 'auto-cover' */}
      </div>
      <div className='zoom_slider'>
        <div className='slider_circle hover1' onClick={() => handleZoom('out')}>
          <i className='minus_icon'></i>
        </div>
        <input
          type='range'
          min={0.2}
          max={3}
          step={0.2}
          ref={sliderRef}
          value={zoom}
          onChange={e => setZoom(e.target.value)}
        />
        <div className='slider_circle hover1' onClick={() => handleZoom('in')}>
          <i className='plus_icon'></i>
        </div>
      </div>
      <div className='buttons'>
        {isLoading ? (
          <DotLoader color='#1876f2' loading={isLoading} size={30} />
        ) : (
          <>
            {/* <button className='btn' onClick={handleCropImage}>
          Crop
        </button> */}
            <button className='btn blue_btn' onClick={() => setImage(null)}>
              Cancel
            </button>
            <button className='btn red_btn' onClick={handleSubmit}>
              Save
            </button>
          </>
        )}
      </div>
    </>
  );
};
