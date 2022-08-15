import React, { Children, cloneElement, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const ImagePicker = ({
  children,
  setImages,
  setPreviewImages,
  mimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxFileSizeMb = 5,
}) => {
  console.log('imagePicker rendered');

  const [error, setError] = useState(null);

  // Handle Input ------------------------------------------------------------
  const handleImageInput = useCallback(files => {
    console.log('in handleImageInput');
    let filesArray = Array.from(files);

    filesArray.forEach(img => {
      if (!mimeTypes.includes(img.type)) {
        setError(`${img.name} format is unsupported. Only ${mimeTypes.join(', ')} are allowed.`);
        filesArray = filesArray.filter(item => item.name !== img.name);
        return;
      } else if (img.size > maxFileSizeMb * 1024 * 1024) {
        setError(`${img.name} size is too large max ${maxFileSizeMb} allowed.`);
        filesArray = filesArray.filter(item => item.name !== img.name);
        return;
      } else if (setPreviewImages) {
        //  Create preview versions of images
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = readerEvent => {
          setPreviewImages(prev => [...prev, readerEvent.target.result]); //could use reader.result? in case we wont need readerEvent
        };
      }
    });
    setImages(prev => [...prev, ...filesArray]);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: handleImageInput,
  });

  return (
    <div {...getRootProps({ onClick: e => e.stopPropagation() })}>
      <label htmlFor='post_image' />
      <input
        {...getInputProps({
          id: 'post_image',
          name: 'images',
          type: 'file',
          // accept: 'image/jpeg, image/png, image/webp, image/gif',
          accept: mimeTypes.join('. '),
          multiple: true,
          hidden: true,
          onChange: () => alert('onChange'),
        })}
      />
      {children({ open })}
    </div>
  );
};
