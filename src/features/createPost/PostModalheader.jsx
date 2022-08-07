export const PostModalheader = ({ setModalVisiable }) => {
  return (
    <div className='modal_header'>
      <div className='invisible'></div>
      <span className='header_text'>Create Post</span>
      <div className='small_circle' onClick={() => setModalVisiable(false)}>
        <i className='exit_icon'></i>
      </div>
    </div>
  );
};
