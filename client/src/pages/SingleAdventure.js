// idea for CSS-- use tooltips so they can hover to show commentAuthor so the flow looks like an ongoing story
// was thinking of maybe making this a dropdown modal instead of page
import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_ADVENTURE } from '../utils/queries';

import "../css/commentsPage.css"

const styles = {
  margin: 200,
  padding: 100
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

  if (loading)
  {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="my-3" style={styles}>
        <h3 className=" thoughtHeader card-header text-light p-2 m-0">
          {adventure.adventureAuthor} <br />
          <span style={{ fontSize: '1rem' }}>
            created this adventure at {adventure.createdAt}
          </span>
        </h3>
        <div className="bg-light py-4">
          <blockquote
            className="p-4"
            style={{
              fontSize: '1.5rem',
              fontStyle: 'italic',
              border: '2px dotted #880f00',
              lineHeight: '1.5',
            }}
          >
            {adventure.adventureText}
          </blockquote>
        </div>

        <div className="my-5">
          <CommentList comments={adventure.comments} />
        </div>
        <div className="m-3 p-4" style={{ border: '3px dotted #880f00' }}>
          <CommentForm adventureId={adventure._id} />
        </div>
      </div>
    </>
  );
};

export default SingleAdventure;
