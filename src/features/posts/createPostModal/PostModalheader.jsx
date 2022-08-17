export const PostModalheader = ({ setModalVisiable }) => {
  return (
    <div className='modal_header'>
      {/* invisible class may be redundant */}
      <div className='invisible'></div>
      <h2 className='header_text'>Create Post</h2>
      <div className='small_circle' onClick={() => setModalVisiable(false)}>
        <i className='exit_icon'></i>
      </div>
    </div>
  );
};
