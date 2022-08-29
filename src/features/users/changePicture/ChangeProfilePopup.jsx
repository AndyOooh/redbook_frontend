import { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { useSelector } from 'react-redux';
// import getCroppedImg from 'utils/getCroppedImg';
import getCroppedImg from 'utils/getCroppedImg copy';
import { useUpdateProfilePhotoMutation } from '../usersApiSlice';

export const ChangeProfilePopup = ({ image, setImage, imagePreview, setImagePreview }) => {
  const { user } = useSelector(state => state.auth);
  const sliderRef = useRef(null);

  const [description, setDescription] = useState('');
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // console.log('selectedimage', image);
  console.log('selectedimagePreview', imagePreview);
  console.log('croppedArea', croppedArea);

  const handleZoom = direction => {
    direction === 'in' ? sliderRef.current.stepUp() : sliderRef.current.stepDown();
    setZoom(sliderRef.current.value);
  };


  const onCropComplete = useCallback((croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleCropImage = useCallback(async () => {
    try {
      const { preview, croppedImage, filefromblob, imageFile } = await getCroppedImg(
        // imagePreview,
        imagePreview.objectUrl,
        croppedArea
      );

      // const images22 = await getCroppedImg(imagePreview, croppedArea);
      // console.log("🚀 ~ file: ChangeProfilePopup.jsx ~ line 38 ~ ChangeProfilePopup ~ images22", images22)
      console.log('🚀 ~ croppedImage', croppedImage);
      console.log(
        '🚀 ~ file: ChangeProfilePopup.jsx ~ line 38 ~ ChangeProfilePopup ~ imageFile',
        imageFile
      );
      setZoom(1);
      setCrop({ x: 0, y: 0 });
      // setImagePreview(preview);
      setImagePreview(prev => {
        return { ...prev, objectUrl: croppedImage };
      });

      // setImages(prev => [...prev, ...filesArray])
      // set real image too? to what?
      // setImage(croppedImage);
      // setImage(filefromblob);
      setImage(preview);
      // setImage(imageFile);
      console.log(
        '🚀 ~ file: ChangeProfilePopup.jsx ~ line 42 ~ ChangeProfilePopup ~ image',
        image
      );
    } catch (error) {
      console.log('🚀 ~ error', error);
    }
  }, [imagePreview, croppedArea, setImage, setImagePreview, image]);

  const [updateProfilePhoto, { isLoading, isSucces, error }] = useUpdateProfilePhotoMutation();

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      console.log('🚀 ~ handleSubmit description: ', description);
      console.log('🚀 ~ imagePreview', imagePreview);
      console.log('🚀 ~ image', image);

      const postData = new FormData();
      postData.append('description', description);
      // postData.append('images', image);
      postData.append('images', imagePreview);
      // for (let i = 0; i < image.length; i++) {
      //   postData.append('images', image[i]);
      // }
      // formData.append('image', selectedimage);
      // formData.append('image', selectedimagePreview[0]);

      try {
        for (var pair of postData.entries()) {
          console.log('in for loop');
          console.log('from iterator:', pair[0] + ', ' + pair[1]);
        }
        const { data } = await updateProfilePhoto({ postData, userId: user.id }).unwrap();

        console.log('🚀 ~ data', data);
      } catch (error) {
        console.log('🚀 ~ error', error);
      }
    },
    [image, imagePreview, description, updateProfilePhoto, user.id]
  );

  return (
    <>
      <div className='description'>
        <textarea
          placeholder='Description'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className='image_cropper'>
        <Cropper
          // image={imagePreview.file}
          image={imagePreview.objectUrl}
          // image={selectedimage}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          cropShape='round'
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
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
        <button className='btn' onClick={handleCropImage}>
          Crop
        </button>
        <button className='btn' onClick={handleSubmit}>
          Save
        </button>
      </div>
    </>
  );
};

const preview99 = {
  asset_id: 'f171787b6d05ced1fbe41577fdc655df',
  public_id: 'redbook/users/Albert/xi7zbgpbbsjiiomn5ebj',
  version: 1661557632,
  version_id: '9b89f012c11ba24cc665ebe905a57bc7',
  signature: '84cd76f4d4d1156fdcdf7bb68b5e250352a7dad6',
  width: 595,
  height: 595,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2022-08-26T23:47:12Z',
  tags: [],
  bytes: 73956,
  type: 'upload',
  etag: '6825eae4f340c363b562fbf14540308d',
  placeholder: false,
  url: 'http://res.cloudinary.com/dy5zg2sdz/image/upload/v1661557632/redbook/users/Albert/xi7zbgpbbsjiiomn5ebj.jpg',
  secure_url:
    'https://res.cloudinary.com/dy5zg2sdz/image/upload/v1661557632/redbook/users/Albert/xi7zbgpbbsjiiomn5ebj.jpg',
  folder: 'redbook/users/Albert',
  api_key: '763522717114851',
};

const fileFile = {
  asset_id: '7297e66ec212065cc6942c1ab4547b88',
  public_id: 'redbook/users/Albert/profile/140fd2d347de0c8e88040e98fafddfe7',
  version: 1661557473,
  version_id: '283a5364ad722695c96da9b9f483aefb',
  signature: 'b8da7e53d806fbb78330e94f123599abb558efb7',
  width: 595,
  height: 595,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2022-08-26T23:44:33Z',
  tags: [],
  bytes: 73961,
  type: 'upload',
  etag: 'f7450713eef0836635d77a996f5c5249',
  placeholder: false,
  url: 'http://res.cloudinary.com/dy5zg2sdz/image/upload/v1661557473/redbook/users/Albert/profile/140fd2d347de0c8e88040e98fafddfe7.jpg',
  secure_url:
    'https://res.cloudinary.com/dy5zg2sdz/image/upload/v1661557473/redbook/users/Albert/profile/140fd2d347de0c8e88040e98fafddfe7.jpg',
  folder: 'redbook/users/Albert/profile',
  original_filename: '140fd2d347de0c8e88040e98fafddfe7',
  api_key: '763522717114851',
};
