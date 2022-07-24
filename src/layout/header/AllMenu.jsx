import { useRef } from 'react';
import { menu, create } from './allMenuData';
import useClickOutside from '../../hooks/clickOutside';
import AllMenuItem from './AllMenuItem';

export default function AllMenu() {
  const menuGroupsArray = [
    {
      title: 'Social',
      sliceStart: 0,
      sliceEnd: 6,
    },
    {
      title: 'Entertainment',
      sliceStart: 6,
      sliceEnd: 9,
    },
    {
      title: 'Shopping',
      sliceStart: 9,
      sliceEnd: 11,
    },
    {
      title: 'Personal',
      sliceStart: 11,
      sliceEnd: 15,
    },
    {
      title: 'Professional',
      sliceStart: 15,
      sliceEnd: 17,
    },
    {
      title: 'Community Resources',
      sliceStart: 17,
      sliceEnd: 21,
    },
    {
      title: 'Community Resources',
      sliceStart: 17,
      sliceEnd: 21,
    },
    {
      title: 'More from Red Book',
      sliceStart: 21,
      sliceEnd: 23,
    },
  ];

  const menuGroups = menuGroupsArray.map(menuGroup => {
    return (
      <div className='all_menu_group' key={menuGroup.title}>
        <div className='all_menu_group_header'>{menuGroup.title}</div>
        {menu.slice(menuGroup.sliceStart, menuGroup.sliceEnd).map((item, i) => (
          <AllMenuItem
            name={item.name}
            description={item.description}
            icon={item.icon}
            key={item.name}
          />
        ))}
      </div>
    );
  });

  return (
    <div className='all_menu'>
      <div className='all_menu_header'>Menu</div>
      <div className='all_menu_wrap scrollbar'>
        <div className='all_left'>
          <div className='all_menu_search'>
            <i className='amm_s_ic'></i>
            <input type='text' placeholder='Search Menu' />
          </div>
          {menuGroups}
        </div>
        <div className='all_right'>
          <div className='all_right_header'>Create</div>
          {create.map(item => (
            <div className='all_right_item hover1'>
              <div className='all_right_circle'>
                <i className={item.icon}></i>
              </div>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
