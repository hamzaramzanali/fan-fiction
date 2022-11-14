import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import "../css/profilePage.css";
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card'

// import ProfileAside from '../components/ProfileAside';
import ProfileContent from '../components/profileContent';
// import RandomCharacterGenerator from '../components/RandomCharacter';
import AddAdventure from '../components/AddAdventure';
import AdventureList from '../components/AdventureList'
import DailyCharacter from '../components/DailyCharacter';

import { QUERY_ME } from '../utils/queries';
// QUERY_USER,

import Auth from '../utils/auth';
// import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Profile = () => {
    const { username: userParam } = useParams();




    // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    //     variables: { username: userParam },
    // });

    const { loading, data } = useQuery(QUERY_ME);

    console.log(`DATA: ${data}`);

    const user = data?.me || data?.user || [];
    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/profile" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user?.username) {
        return (
            <>
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
            </>
        );
    }
    console.log(user.username);
    return (
        <>
        <Container className="profile">
                    <ProfileContent />
            {/* {/* <Row> */}
                {/* <Col> */}
                    {/* <Card>
                        <Card.Title>
                            Your adventure awaits!
                        </Card.Title>
                        <ListGroup currentComponent={currentComponent} handleComponentChange={handleComponentChange}>
                            <ListGroupItem>
                                <Card.Link className='searchBy' href='/searchSpecific'>Search</Card.Link>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Link className='searchBy' href='/'>Homepage</Card.Link>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Link className='searchBy' href='/profile'>Start an Adventure</Card.Link>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Link
                                    onClick={() => handleComponentChange('viewYourAdventure')}
                                    href='/adventureList'
                                    className={currentComponent === 'viewYourAdventure' ? 'nav-link active' : 'nav-link'}
                                >
                                    View your Adventures
                                </Card.Link>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Link className='searchBy' href='#/action-3'>Add to your Adventure</Card.Link>
                            </ListGroupItem>
                        </ListGroup>
                    </Card> */}
                {/* </Col> */}
                {/* <Col xs={6}>
                    <Card>
                        <div className="flex-row justify-center mb-3">
                            <h2 className="profileHead col-12 col-md-10 text-light p-3 mb-5">
                                Viewing {userParam ? `${user.username}'s` : 'your'} profile
                            </h2>
                            <div>
                                <ProfileContent/>
                            </div>


                            {/* {data && (
                                <div
                                    className="adventureBox col-12 col-md-10 mb-3 p-3"
                                    style={{ border: '1px dotted #1a1a1a' }}
                                >
                                    <AdventureList adventures={user.adventures} />
                                    <AddAdventure />
                                </div>
                            )} */}
                        {/* </div>
                    </Card>
                        </Col> 
                <Col>

                  <DailyCharacter />
                </Col>
            </Row>

                    <h2 className='title'>Today's Marvel Showdown</h2>
                    {/* <RandomCharacterGenerator/> */}
                {/* </Col>  */}
            {/* </Row> */} 


         </Container>
         </>

    );
};
// console.log(user.username);

export default Profile;
