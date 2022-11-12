import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';


const ProfileAside = () => {
    return (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Your adventure awaits!
          </Dropdown.Toggle>
    
          <Dropdown.Menu>
            {/* <Dropdown.Item href="/search">Search</Dropdown.Item> */}
            <Dropdown.Item href="/">Homepage</Dropdown.Item>
            <Dropdown.Item href="/profile">Start an Adventure</Dropdown.Item>
            <Dropdown.Item href="#/action-3">View your Adventure</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Add to your Adventure</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );};

export default ProfileAside; 
