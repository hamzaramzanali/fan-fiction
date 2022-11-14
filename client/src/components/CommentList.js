import React from 'react';
import '../css/commentsPage.css'

const styles = {
  author: {
    visibility: 'hidden'
  },
}

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3 className='commentText'>No Community Contributions Yet</h3>;
  }

  
  
  return (
    <>
      <h2 id='commentHeader'
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #880f00' }}
      >
        Contributions
      </h2>
      <div id='thoughtsCard' className="flex-row my-4">
        {comments && comments.map((comment) => (
          <span key={comment._id}>{comment.commentText} <cite className='commentAuthor' style={styles.author}>{comment.commentAuthor}</cite> </span>
          ))}
      </div>
    </>
  );
};

export default CommentList;

           