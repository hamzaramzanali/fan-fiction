import React from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card'
import { ListGroup, ListGroupItem } from 'react-bootstrap';

function ProfileAside({ currentComponent, handleComponentChange }) {
  return (
    <div>
      <Card>
        {/* <div> */}
        {/* <ProfileAside /> */}
        <Card.Title>
          Your adventure awaits!
        </Card.Title>
          <ListGroupItem>
            <Card.Link 
              href='/'
              >
                Homepage
              </Card.Link>
          </ListGroupItem>
        <ListGroup>
          <ListGroupItem>
            <Card.Link
              href='#'
              >
                Search Other Users
              </Card.Link>
          </ListGroupItem>
          <ListGroupItem>
            <Card.Link 
              href='#addAdventure'
              onClick={() => handleComponentChange('viewYourAdventure')}
              className={currentComponent === 'viewYourAdventure' ? 'nav-link active' : 'nav-link'}
              >
                Start an Adventure
              </Card.Link>
          </ListGroupItem>
          <ListGroupItem>
            <Card.Link
              href='#viewYourAdventure'
              onClick={() => handleComponentChange('viewYourAdventure')}
              className={currentComponent === 'viewYourAdventure' ? 'nav-link active' : 'nav-link'}
            >
              View your Adventures
            </Card.Link>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};

export default ProfileAside; 
