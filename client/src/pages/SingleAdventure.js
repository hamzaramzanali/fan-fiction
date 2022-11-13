// idea for CSS-- use tooltips so they can hover to show commentAuthor so the flow looks like an ongoing story

import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_ADVENTURE } from '../utils/queries';

const styles = {
    margin: 200,
    padding:100
}

const SingleAdventure = () => {
  const { adventureId } = useParams();
  console.log(adventureId); // this console log works and shows the adventure id correctly
  const { loading, data } = useQuery(QUERY_SINGLE_ADVENTURE, {
    variables: { adventureId: adventureId }, // this is not grabbing the id from the params-- issue with query
  });
  console.log(data); // not logging-- issue with query- may be a typo
  console.log(adventureId); // not logging-- issue with query- may be a typo
  const adventure = data?.adventure || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3" style={styles}>
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {adventure.adventureAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this thought on {adventure.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {adventure.adventureText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={adventure.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm adventureId={adventure._id} />
      </div>
    </div>
  );
};

export default SingleAdventure;
