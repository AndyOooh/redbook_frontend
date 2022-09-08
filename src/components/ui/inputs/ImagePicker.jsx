import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';

export const ImagePicker = ({
  children,
  setImage,
  setImages,
  multiple = true,
  preview,
  mimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxFileSizeMb = 5,
}) => {
  console.log('imagePicker rendered');

  const [error, setError] = useState(null);

  // either import image and images or do it outside of this component. probably the latter, sinve they are not shown here.
  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  // }, []);

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
        setError(`${img.name} size is too large. Max. ${maxFileSizeMb}MB allowed.`);
        filesArray?.length > 0 && filter(img, filesArray);
      }
      return filesArray;
    },
    [mimeTypes, maxFileSizeMb]
  );

  // Handle Input ------------------------------------------------------------
  const handleInput = useCallback(
    files => {
      console.log('in handleInput of ImagePicker æææææææææææææææææææææææææææææææææ');
      let filesArray = Array.from(files);
      filesArray.forEach(img => {
        filesArray = validation(img, filesArray);
        if (
          preview &&
          filesArray.some(item => item.name === img.name) //Why is this not !not?
        ) {
          img.id = uuidv4();
          img.url = URL.createObjectURL(img);
        }
      });
      multiple ? setImages(prev => [...prev, ...filesArray]) : setImage(filesArray[0]);
    },
    [setImage, setImages, preview, multiple, validation]
  );

  // Dropzone ------------------------------------------------------------
  const { getRootProps, getInputProps, open, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop: handleInput,
    accept: { 'image/*': ['.jpeg', '.png'] },
    // noClick: true,
    // noKeyboard: true,
  });

  const actionClass = isFocused
    ? 'focused'
    : isDragAccept
    ? 'accepted'
    : isDragReject
    ? 'rejected'
    : '';

  const baseStyle = {
    width: '100%',
  };

  return (
    <div
      {...getRootProps({
        onClick: e => e.stopPropagation(),
        className: `dropArea ${actionClass}`,
        style: baseStyle,
      })}>
      <label htmlFor='post_image' style={{ display: 'none' }} />
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
      {children && children({ error, setError, open, getRootProps })}
    </div>
  );
};
