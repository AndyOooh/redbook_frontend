import { Link } from 'react-router-dom';

import { Modal } from 'components';
import { Modalheader } from 'components/ui/modal/Modalheader';
import { DetailItem } from './DetailItem';

export const EditDetailsModal = ({
  detailsArray,
  handleChange,
  updateDetails,
  visible,
  setVisible,
}) => {
  let topicArray = [];
  let currentTopic = '';
  return (
    <Modal className='modal_type_1 edit_details_modal' visible={visible} setVisible={setVisible}>
      <Modalheader setVisible={setVisible} headerText='Edit Details' />
      <div className='vert_line'></div>
      <div className='modal_middle overflow_a scrollbar'>
        <div className='details_col'>
          <h4>Customize Your Intro</h4>
          <p>Details you select will be public</p>
        </div>

        {detailsArray.slice(1).map(detail => {
          currentTopic = '';
          if (!topicArray.includes(detail.topic)) {
            topicArray.push(detail.topic);
            currentTopic = detail.topic;
          }
          return (
            <div className='topic_wrapper' key={detail.name}>
              {currentTopic && <h4>{currentTopic}</h4>}
              <DetailItem
                section={detail.queryValue}
                value={detail.value}
                img={detail.icon}
                placeholder={`Add ${detail.lowerCaseAndSpace} `}
                name={detail.name}
                text={detail.lowerCaseAndSpace}
                handleChange={handleChange}
                updateDetails={updateDetails}
              />
            </div>
          );
        })}
      </div>
      <div className='modal_bottom'>
        <Link to='about'>
          <span>Update Your Information</span>
        </Link>
        <div className='save_cancel_btns'>
          <button className='btn gray_btn hover1' onClick={() => setVisible(false)}>
            Cancel
          </button>
          <button
            className='btn red_btn hover1 save'
            // onClick={() => updateDetails()}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};
