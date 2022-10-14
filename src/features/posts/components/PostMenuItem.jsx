export const PostMenuItem = ({ icon, title, subtitle, img, clickHandler, postId }) => {
  return (
    <li className='hover1' onClick={() => clickHandler(postId || null)}>
      {img ? <img src={img} alt='' /> : <i className={icon}></i>}
      <div className='post_menu_text'>
        <span>{title}</span>
        {subtitle && <span className='menu_post_col'>{subtitle}</span>}
      </div>
    </li>
  );
};
