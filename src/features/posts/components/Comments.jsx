import { useState } from 'react';

import { CommentItem } from './CommentItem';
import { CreateComment } from './CreateComment';

export const Comments = ({ post, visible, setVisible }) => {
  const [count, setCount] = useState(3);
  return (
    <>
      <CreateComment postId={post._id} />
      {post.comments.length > 0 && (
        <div>
          {post.comments.slice(0, count).map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
          ))}
        </div>
      )}
      <button className='text_btn' onClick={() => setCount(count + 3)}>
        Load more comments...
      </button>
    </>
  );
};
