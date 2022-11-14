//this renders but adding is not working
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../utils/mutations';

import Auth from '../utils/auth';

import '../css/commentsPage.css'

const CommentForm = ({ adventureId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try
    {
      const { data } = await addComment({
        variables: {
          adventureId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err)
    {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280)
    {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <>
      <div >
        <h4 className='adventureBody'>What are your thoughts on this adventure?</h4>

      {Auth.loggedIn() ? (
        <>
          <p id='adventureBody'
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="adventureBody ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

              <div className="commentBtn col-12 col-lg-3">
                <button className="addCommentBtn btn btn-primary btn-block py-3" type="submit">
                  Add Comment
                </button>
              </div>
            </form>
          </>
        ) : (
          <p className='adventureBody'>
            You need to be logged in to share your thoughts. Please{' '}
            <Link className='adventureBody' to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
      </div>
    </>
  );
};

export default CommentForm;
