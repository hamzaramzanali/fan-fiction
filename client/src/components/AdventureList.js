import React from 'react';
// import { Link } from 'react-router-dom';

const AdventureList = ({
    adventures,
}) => {
    if (!adventures.length) {
        return <h4>No adventures, yet. Create a new adventure!</h4>
    }

    return (
        <>
        {adventures.map(adventure => (
            <>
            <h1>hello</h1>
            <h1>{adventure._id}</h1>
            <h3>{adventure.adventureTitle}</h3>
            <h4>by: {adventure.adventureAuthor}</h4>
            <p>{adventure.adventureBody}</p>
            {/* 
            <div>
                {adventure.comments.length && adventure.comments.map(comment => (
                    <>
                        <h5>
                            {comment.commentText}
                        </h5>
                        <h6>by {comment.commentAuthor}</h6>
                    </>
                ))}
                {!adventure.comments.length && <h5>No comments yets.</h5>}
            </div> */}
            </>
        ))}
        </>
    )
}

export default AdventureList;

