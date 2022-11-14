import React from 'react';
import Card from 'react-bootstrap/Card'
import { ListGroup, ListGroupItem } from 'react-bootstrap';

function ProfileAside({ currentComponent, handleComponentChange }) {
  return (
    <>
      <div className='profileAside'>
        <Card className="nav nav-pills nav-justified">
          <Card.Title className="adventureAwaits">
            Your Adventure Awaits!
          </Card.Title>
          <ListGroupItem>
            <Card.Link className='searchBy'
              href='/'
            >
              Homepage
            </Card.Link>
          </ListGroupItem>
          <ListGroup>
            <ListGroupItem>
              <Card.Link id='addAdventureNav'
                href='#addAdventure'
                onClick={() => handleComponentChange('addAdventure')}
                className={currentComponent === 'addAdventure' ? 'nav-item nav-link active text-white' : 'nav-link nav-item text-dark font-weight-bold'}
              >
                Start an Adventure
              </Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link id='viewAdventuresNav'
                href='#viewYourAdventure'
                onClick={() => handleComponentChange('viewYourAdventure')}
                className={currentComponent === 'viewYourAdventure' ? 'nav-item nav-link active text-white' : 'nav-link nav-item text-dark font-weight-bold'}
              >
                View your Adventures
              </Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link className='searchBy'
                href='#'
              >
                Search Other Users
              </Card.Link>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    </>
  );
};

export default ProfileAside; 
