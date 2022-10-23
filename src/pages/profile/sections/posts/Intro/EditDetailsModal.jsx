import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdModeEditOutline } from 'react-icons/md';
import { BsFillPlusCircleFill, BsPeopleFill } from 'react-icons/bs';

import { Modal } from 'components';
import { Modalheader } from 'components/ui/modal/Modalheader';
import { ProfileContext } from 'pages/profile/profileContext/profileContext';
import { isEmptyValue } from 'utils/isEmptyValue';

export const EditDetailsModal = ({ visible, setVisible }) => {
  const { detailsArray } = useContext(ProfileContext);

  const findSection = (itemName, nested = false) => {
    return !nested
      ? detailsArray
          ?.slice(1)
          .find(item => item.subItems?.some(subItem => subItem?.name === itemName))?.snakeCase
      : detailsArray
          ?.slice(1)
          .find(item =>
            item.subItems?.map(subItem =>
              subItem.nestedItems.some(nestedItem => nestedItem?.name === itemName)
            )
          )?.snakeCase;
  };

  // Much of this component is the repeated in About.
  // Could extract About right side to a component and use here for the middle part.
  return (
    <Modal className='modal_type_1 edit_details_modal' visible={visible} setVisible={setVisible}>
      <Modalheader setVisible={setVisible} headerText='Edit Details' />
      <div className='vert_line'></div>

      <div className='modal_middle overflow_a scrollbar'>
        <div className='details_col'>
          <h4>Customize Your Intro</h4>
          <p>Details you select will be public</p>
        </div>

        {detailsArray?.slice(1).map(detail =>
          detail.subItems.map(subItem =>
            isEmptyValue(subItem.value) && !subItem.nestedItems ? ( // Not nested, no value
              <React.Fragment key={subItem.name}>
                <div key={subItem.name} className='content_subitem'>
                  <h4>{subItem.name}</h4>
                  <p>{subItem.value} </p>
                  <NavLink className='add_row' to={`about?section=${findSection(subItem.name)}`}>
                    <BsFillPlusCircleFill /> Add {subItem.name}
                  </NavLink>
                </div>
              </React.Fragment>
            ) : !subItem.nestedItems ? (
              // !nestedItems
              <div key={subItem.name} className='content_subitem'>
                <h4>{subItem.name}</h4>
                <div className='subItem_row'>
                  <div className='subItem_left'>
                    <img src={subItem.iconSrc} alt='' />
                    <p>{subItem.text}</p>
                  </div>
                  <div className='subItem_right'>
                    <BsPeopleFill />
                    <NavLink to={`about?section=${findSection(subItem.name)}`}>
                      <MdModeEditOutline />
                    </NavLink>
                  </div>
                </div>
              </div>
            ) : (
              // nestedItems
              <div className='content_item' key={subItem.name}>
                <h3 key={subItem.subTitle}>{subItem.subTitle}</h3>
                {subItem.nestedItems.map(nestedItem => (
                  <React.Fragment key={nestedItem.name}>
                    <div className='content_subitem'>
                      <h4>{nestedItem.name}</h4>
                      {!nestedItem.value || nestedItem.value.length === 0 ? (
                        <NavLink
                          className='add_row'
                          to={`about?section=${findSection(nestedItem.name, true)}`}>
                          <BsFillPlusCircleFill /> Add {nestedItem.name}
                        </NavLink>
                      ) : (
                        <div className='subItem_row'>
                          <div className='subItem_left'>
                            <img src={nestedItem.iconSrc} alt='' />
                            <p>{nestedItem.text}</p>
                          </div>
                          <div className='subItem_right'>
                            <BsPeopleFill />
                            <NavLink to={`about?section=${findSection(nestedItem.name, true)}`}>
                              <MdModeEditOutline />
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )
          )
        )}
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
