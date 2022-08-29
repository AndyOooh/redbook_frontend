import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';

export const ImagePicker = ({
  multiple = true,
  children,
  setImages,
  setImage,
  setPreviewImages,
  setPreviewImage,
  mimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxFileSizeMb = 5,
}) => {
  console.log('imagePicker rendered');

  const [error, setError] = useState(null);

  const validation = useCallback(
    (img, filesArray) => {
      let filter;
      if (filesArray?.length > 0) {
        filter = (image, array) => {
          filesArray = array.filter(item => item.name !== image.name);
          return filesArray;
        };
      }
      if (!mimeTypes.includes(img.type)) {
        setError(
          `${img.name.split('.')[1]} files are not supported. Please use ${mimeTypes
            .map(mt => mt.split('/')[1])
            .join(', ')} only.`
        );
        filesArray?.length > 0 && filter(img, filesArray);
      } else if (img.size > maxFileSizeMb * 1024 * 1024) {
        setError(`${img.name} size is too large. Max. ${maxFileSizeMb} allowed.`);
        filesArray?.length > 0 && filter(img, filesArray);
      }
      return filesArray;
    },
    [mimeTypes, maxFileSizeMb]
  );

  // Handle Input ------------------------------------------------------------
  const handleInput = useCallback(
    files => {
      let filesArray = Array.from(files);

      filesArray.forEach(img => {
        filesArray = validation(img, filesArray);

        //  Create preview versions of images if setPreviewImage(s) is true
        if (
          (setPreviewImages || setPreviewImage) &&
          filesArray.some(item => item.name === img.name)
        ) {
          img.id = uuidv4();
          const reader = new FileReader();
          reader.readAsDataURL(img);
          reader.onload = readerEvent => {
            if (multiple) {
              setPreviewImages(prev => [
                ...prev,
                { base64: readerEvent.target.result, id: 'preview' + img.id },
              ]); //could use reader.result? in that case, we wont need readerEvent
            } else {
              // setPreviewImage(readerEvent.target.result);
              const imageUrl = URL.createObjectURL(filesArray[0]); //new
              console.log('🚀 ~ file: ImagePicker.jsx ~ line 69 ~ imageUrl', imageUrl);
              setPreviewImage({ file: filesArray[0], objectUrl: imageUrl });
              // setPreviewImage(filesArray[0]);
            }
          };
        }
      });
      multiple ? setImages(prev => [...prev, ...filesArray]) : setImage(filesArray[0]);
    },
    [multiple, setPreviewImages, setImages, setImage, setPreviewImage, validation]
  );

  // Dropzone ------------------------------------------------------------
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: handleInput,
  });

  return (
    <>
      <label
        {...getRootProps({
          onClick: e => e.stopPropagation(),
          htmlFor: 'post_image',
          style: { display: 'none' },
        })}
      />
      <input
        {...getInputProps({
          id: 'post_image',
          name: 'images',
          type: 'file',
          accept: mimeTypes.join('. '),
          multiple: multiple,
          hidden: true,
          onChange: () => alert('onChange'),
        })}
      />
      {children && children({ open, error, setError })}
    </>
  );
};
