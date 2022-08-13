import React, { Children, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const ImagePicker = ({
  // Children,
  setImages,
  setVisible,
  usePreviews,
  previewImages,
  setPreviewImages,
}) => {
  console.log('imagePicker rendered');

  // console.log('children', children);
  console.log('children', Children);
  const [error, setError] = useState(null);

  const handleImageInput = useCallback(files => {
    console.log('in handleImageInput');
    console.log('e', files);
    let filesArray = Array.from(files);

    //  Create preview versions of images
    const mimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxFileSizeMb = 5;

    console.log('usePreviews', usePreviews);

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
      } else if (usePreviews) {
        console.log('usePreviews.....................!!!!!!!!!');
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = readerEvent => {
          setPreviewImages(prev => [...prev, readerEvent.target.result]); //could use reader.result? in case we wont need readerEvent
        };
      }
    });
    setImages(prev => [...prev, ...filesArray]);
  }, []);

  const { getRootProps, getInputProps, inputRef, rootRef, open } = useDropzone({
    onDrop: handleImageInput,
  });
  console.log('prevImages', previewImages);

  const classNames =
    previewImages && previewImages.length > 0
      ? 'image_picker has_images overflow_a scrollbar'
      : 'image_picker';

  return (
    <div {...getRootProps({ onClick: e => e.stopPropagation(), className: classNames })}>
      <label htmlFor='post_image' />
      <input
        {...getInputProps({
          id: 'post_image',
          name: 'images',
          type: 'file',
          accept: 'image/jpeg,image/png,image/webp,image/gif',
          multiple: true,
          hidden: true,
          // onChange: handleImageInput,
        })}
      />
      {/* {children(inputRef, open)} */}
      {React.cloneElement(Children, { inputRef: inputRef, open: open })}
    </div>
  );
};
