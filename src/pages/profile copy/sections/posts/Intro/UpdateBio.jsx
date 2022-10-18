
export const UpdateBio = ({
  handleSubmitDetails,
  setVisible,
  updatedDetails,
  remainingChar,
  handleChange,
}) => {
  return (
    <>
      {updatedDetails?.relationshipStatus ? (
        <select
          className='select_rel'
          name='relationship'
          value={updatedDetails.relationship}
          onChange={handleChange}>
          <option value='Single'>Single</option>
          <option value='In a relationship'>In a relationship</option>
          <option value='Married'>Married</option>
          <option value='Divorced'>Divorced</option>
        </select>
      ) : (
        <textarea
          placeholder='Describe who you are'
          name='bio'
          maxLength={updatedDetails?.bio ? 25 : 100}
          className='textarea_blue details_input'
          onChange={handleChange}></textarea>
      )}
      {!updatedDetails?.bio && (
        <div className='remaining'>{remainingChar} characters remaining</div>
      )}
      <div className='actions'>
        <div className='visibility_row'>
          <i className='public_icon'></i>
          Public
        </div>
        <div className='action_buttons'>
          <button className='btn gray_btn' onClick={() => setVisible(false)}>
            Cancel
          </button>
          <button
            className='btn red_btn'
            onClick={() => {
              handleSubmitDetails();
            }}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};
