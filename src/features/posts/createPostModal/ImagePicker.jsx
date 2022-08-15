import React, { Children, cloneElement, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const ImagePicker = ({
  // Children,
  children,
  className,
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
    console.log('e', files);
    let filesArray = Array.from(files);

    filesArray.forEach(img => {
      console.log('in forEach..................!!!');
      if (!mimeTypes.includes(img.type)) {
        console.log('memetype error', img.type);
        setError(`${img.name} format is unsupported. Only ${mimeTypes.join(', ')} are allowed.`);
        filesArray = filesArray.filter(item => item.name !== img.name);
        return;
      } else if (img.size > maxFileSizeMb * 1024 * 1024) {
        console.log('file too big................!!!!!!!!!');
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

  const handle2 = files => {
    console.log('in handle2');
    console.log('e', files);
  };

  console.log('past handleImageInput');

  const { getRootProps, getInputProps, inputRef, rootRef, open } = useDropzone({
    onDrop: handleImageInput,
    // handleImageInput,
  });

  return (
    <div {...getRootProps({ onClick: e => e.stopPropagation(), className: className })}>
      <label htmlFor='post_image' />
      <input
        {...getInputProps({
          id: 'post_image',
          name: 'images',
          type: 'file',
          accept: 'image/jpeg,image/png,image/webp,image/gif',
          multiple: true,
          hidden: true,
          // onInput: () => alert('onInput'),
          onChange: () => alert('onChange'),
        })}
      />

      {children({ open })}
    </div>
  );
};
