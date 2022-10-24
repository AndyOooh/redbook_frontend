import { useHoverHandler } from 'hooks/useHoverHandler';
import { useCudReactionMutation } from '../postsApiSlice';

const folder = '../../../../reacts/';
const reactionsArray = [
  {
    name: 'like',
    image: folder + 'like.gif',
  },
  {
    name: 'love',
    image: folder + 'love.gif',
  },
  {
    name: 'haha',
    image: folder + 'haha.gif',
  },
  {
    name: 'wow',
    image: folder + 'wow.gif',
  },
  {
    name: 'sad',
    image: folder + 'sad.gif',
  },
  {
    name: 'angry',
    image: folder + 'angry.gif',
  },
];

export const ReactionsPopup = ({ postId, visible, setVisible }) => {
  const hoverHandler = useHoverHandler();

  const [cudReaction, { isLoading, Error }] = useCudReactionMutation();

  const handleSubmit = async reaction => {
    const response = await cudReaction({ postId: postId, type: reaction });
    // hoverHandler(setVisible, false);
    setVisible(false);
    console.log('🚀 ~ file: ReactionsPopup.jsx ~ line 38 ~ response', response);
  };

  return isLoading ? null : (
    <>
      {visible && (
        <>
          <div
            className='reacts_popup'
            onMouseOver={() => hoverHandler(setVisible, true)}
            onMouseLeave={() => hoverHandler(setVisible, false)}>
            {reactionsArray.map(react => (
              <div key={react.name} className='react' onClick={() => handleSubmit(react.name)}>
                <img src={react.image} alt={react.name} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
