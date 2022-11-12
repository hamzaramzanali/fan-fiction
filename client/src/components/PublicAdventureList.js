import React from 'react';


const PublicAdventureList = ({
    adventures,
}) => {
    if (!adventures.length) {
        return <h3>No Adventures Yet</h3>;
    }

    return (
        <div>
                {adventures.map((adventure) => (
                    <div key={adventure._id} className="card mb-3">
                        <h4 className="card-header bg-primary text-light p-2 m-0">
                            {adventure.adventureTitle}
                        </h4>
                        <div className="card-body bg-light p-2">
                            <p>{adventure.adventureBody}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default PublicAdventureList;
