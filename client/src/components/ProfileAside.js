import React from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card'
import { ListGroup, ListGroupItem } from 'react-bootstrap';

function ProfileAside({ currentComponent, handleComponentChange }) {
  return (
    <div>
      <Card className="nav nav-pills danger nav-justified">
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
              href='#addAdventure'
              onClick={() => handleComponentChange('addAdventure')}
              className={currentComponent === 'addAdventure' ? 'nav-item nav-link active text-white bold font-weight-bold' : 'nav-link nav-item text-dark bold font-weight-bold'}
              >
                Start an Adventure
              </Card.Link>
          </ListGroupItem>
          <ListGroupItem>
            <Card.Link
              href='#viewYourAdventure'
              onClick={() => handleComponentChange('viewYourAdventure')}
              className={currentComponent === 'viewYourAdventure' ? 'nav-item nav-link active text-white font-weight-bold' : 'nav-link nav-item text-dark font-weight-bold'}
            >
              View your Adventures
            </Card.Link>
          </ListGroupItem>
          <ListGroupItem>
            <Card.Link
              href='#'
              >
                Search Other Users
              </Card.Link>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};

export default ProfileAside; 
