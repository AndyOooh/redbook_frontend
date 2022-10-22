import { Link } from 'react-router-dom';

import { Modal } from 'components';
import { Modalheader } from 'components/ui/modal/Modalheader';
import { DetailItem } from './DetailItem';

export const EditDetailsModal = ({
  // detailsArray,
  handleChange,
  updateDetails,
  visible,
  setVisible,
}) => {
  let topicArray = [];
  let currentTopic = '';

  const { detailsArray } = useContext(ProfileContext);

  return (
    <Modal className='modal_type_1 edit_details_modal' visible={visible} setVisible={setVisible}>
      <Modalheader setVisible={setVisible} headerText='Edit Details' />
      <div className='vert_line'></div>

      <div className='modal_middle overflow_a scrollbar'>
        <div className='details_col'>
          <h4>Customize Your Intro</h4>
          <p>Details you select will be public</p>
        </div>

        {detailsArray.slice.map(detail => {
          !subItem.value && !subItem.nestedItems ? (
            <React.Fragment key={subItem.name}>
              <div key={subItem.name} className='content_item'>
                <h4>{subItem.name}</h4>
                <div className='add_row' onClick={() => handleShowInput(subItem.dbName)}>
                  <BsFillPlusCircleFill /> Add {subItem.name}
                </div>
              </div>
              {showDetailInput === subItem.dbName && (
                <DetailInput
                  name={subItem.dbName}
                  value={updatedDetails[subItem.dbName]}
                  changeHandler={handleChange}
                  cancelHandler={reset}
                  saveHandler={handleUpdateDetails}
                  path={currentCategory + '.' + subItem.dbName}
                  disabled={updatedDetails[subItem.dbName] === ''}
                  subTitle={subItem.name}
                />
              )}
            </React.Fragment>
          ) : !subItem.nestedItems ? (
            // !nestedItems
            <div key={subItem.name} className='content_item'>
              <h4>{subItem.name}</h4>
              <div className='subItem_row'>
                <div className='subItem_left'>
                  <img src={subItem.iconSrc} alt='' />
                  <p>{subItem.text}</p>
                </div>
                <div className='subItem_right'>
                  <BsPeopleFill />
                  <div onClick={() => handleShowInput(subItem.dbName)}>
                    <MdModeEditOutline />
                  </div>
                </div>
              </div>
              {showDetailInput === subItem.dbName && (
                <DetailInput
                  name={subItem.dbName}
                  value={updatedDetails[subItem.dbName]}
                  changeHandler={handleChange}
                  cancelHandler={reset}
                  saveHandler={handleUpdateDetails}
                  path={currentCategory + '.' + subItem.dbName}
                  disabled={updatedDetails[subItem.dbName] === ''}
                  subTitle={subItem.name}
                />
              )}
            </div>
          ) : (
            // nestedItems
            <React.Fragment key={subItem.subTitle}>
              <h3 key={subItem.subTitle}>{subItem.subTitle}</h3>
              {subItem.nestedItems.map(nestedItem => (
                <React.Fragment key={nestedItem.name}>
                  <div className='content_item'>
                    <h4>{nestedItem.name}</h4>
                    {!nestedItem.value || nestedItem.value.length === 0 ? (
                      <div className='add_row' onClick={() => handleShowInput(nestedItem.dbName)}>
                        <BsFillPlusCircleFill /> Add {nestedItem.noun || nestedItem.name}
                      </div>
                    ) : (
                      <div className='subItem_row'>
                        <div className='subItem_left'>
                          <img src={nestedItem.iconSrc} alt='' />
                          <p>{nestedItem.text}</p>
                        </div>
                        <div className='subItem_right'>
                          <BsPeopleFill />
                          <MdModeEditOutline onClick={() => handleShowInput(nestedItem.dbName)} />
                        </div>
                      </div>
                    )}
                  </div>

                  {showDetailInput === nestedItem.dbName && (
                    <DetailInput
                      name={nestedItem.dbName}
                      value={updatedDetails[nestedItem.dbName]}
                      changeHandler={handleChange}
                      cancelHandler={reset}
                      saveHandler={handleUpdateDetails}
                      path={'test' + nestedItem.dbName}
                      disabled={updatedDetails[nestedItem.dbName] === ''}
                      subTitle={nestedItem.name}
                    />
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
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
