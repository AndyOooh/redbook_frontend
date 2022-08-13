import { useHoverHandler } from 'hooks/useHoverHandler';

const reactsArray = [
  {
    name: 'like',
    image: '../../../../reacts/like.gif',
  },
  {
    name: 'love',
    image: '../../../../reacts/love.gif',
  },
  {
    name: 'haha',
    image: '../../../../reacts/haha.gif',
  },
  {
    name: 'wow',
    image: '../../../../reacts/wow.gif',
  },
  {
    name: 'sad',
    image: '../../../../reacts/sad.gif',
  },
  {
    name: 'angry',
    image: '../../../../reacts/angry.gif',
  },
];

export const ReactionsPopup = ({ visible, setVisible }) => {
  const hoverHandler = useHoverHandler();

  return (
    <>
      {visible && (
        <>
          <div
            className='reacts_popup'
            onMouseOver={() => hoverHandler(setVisible, true)}
            onMouseLeave={() => hoverHandler(setVisible, false)}>
            {reactsArray.map(react => (
              <div className='react' key={react.name}>
                <img src={react.image} alt={react.name} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
