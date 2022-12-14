import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from '../components/SignUp';
import LoginForm from '../components/Login';
import '../css/navBar.css';
import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar fixed='top' expand='lg'>
        <Container fluid>
          <Navbar.Brand id="navText" as={Link} to='/'>
            Marvel Fan Fiction
          </Navbar.Brand>
          <Navbar.Toggle className="toggleIcon" aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              {/* if user is logged in show logout/profile/community/search pages */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link className="active" onClick={Auth.logout}>Logout</Nav.Link>
                  <Nav.Link className="active" as={Link} to={"/profile"}>Profile</Nav.Link>
                  <Nav.Link className="active" as={Link} to={"/searchSpecific"}>Search Characters</Nav.Link>
                  <Nav.Link id="navText" as={Link} to={"/community"}>
                    Community Adventures
                  </Nav.Link>
                </>
              ) : (
                <>
                <Nav.Link id="navText" onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                <Nav.Link id="navText" as={Link} to={'/community'}>
                  Community Adventures
                </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link className='loginTitle' eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='signupTitle' eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;







