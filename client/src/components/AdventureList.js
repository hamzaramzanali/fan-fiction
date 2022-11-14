import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Modal, Nav, Tab } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
// import { QUERY_ME } from '../utils/queries';
import { REMOVE_ADVENTURE } from '../utils/mutations';
import Auth from '../utils/auth';
// import { removeAdventureId } from '../utils/localStorage';
import '../css/viewAdventures.css'


const AdventureList = ({
    adventures,
}) => {
    console.log(`ADVENTURE LIST`);
    // const { loading, data } = useQuery(QUERY_ME);
    // const userData = data?.me || [];
    const [deleteAdventure] = useMutation(REMOVE_ADVENTURE);

    // set modal display state
    const [showModal, setShowModal] = useState(false);

    if (!adventures.length) {
        return <h4>No adventures, yet. Create a new adventure!</h4>
    }


    const handleDeleteAdventure = async (adventureId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const deletedAdventure = await deleteAdventure({
                variables: { adventureId }
            })
            if (!deletedAdventure) {
                console.log(`ERROR`)
            }

            // upon success, remove adventure's id from localStorage
            //   removeADventureId(adventureId);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {adventures.map(adventure => (
                <>
                    <Card className='viewTitle' key={adventure._id}>
                        {console.log(`ADVENTURE ID: ${adventure._id}`)}
                        <Card.Body>
                            <Nav.Link className="active" as={Link} to={`/adventure/${adventure._id}`}>
                                <Card.Title>{adventure.adventureTitle}</Card.Title>
                            </Nav.Link>
                            <p className='small'>by: {adventure.adventureAuthor}</p>
                            <Card.Body>
                                <div>
                                    <Card.Text >{adventure.adventureBody}</Card.Text>
                                </div>
                            </Card.Body>
                            <Button className='updateBtn btn-block btn-info' onClick={() => setShowModal(true)} >Update Button</Button>
                            <Button className='deleteBtn btn-block btn-danger' onClick={() => handleDeleteAdventure(adventure._id)}>Delete Button</Button>
                        </Card.Body>
                    </Card>
                    {/* Setting up modal data */}
                    <Modal
                        size='lg'
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        aria-labelledby='signup-modal'>
                        {/* tab container to update */}
                        <Tab.Container defaultActiveKey='login'>
                            <Modal.Header closeButton>
                                <Modal.Title id='signup-modal'>
                                    <Nav variant='pills'>
                                        <Nav.Item>
                                            <Nav.Link className=" updateBtn active"eventKey='updateBtnModal'>Update Adventure</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Tab.Content>
                                    <Tab.Pane eventKey='title'>
                                        {/* <LoginForm handleModalClose={() => setShowModal(false)} /> */}
                                    </Tab.Pane>
                                </Tab.Content>
                            </Modal.Body>
                        </Tab.Container>
                    </Modal>

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

