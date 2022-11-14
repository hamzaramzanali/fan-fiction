import React, { useState } from 'react';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Card, Button, Modal, Nav, Tab, InputGroup, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
// import { QUERY_ME } from '../utils/queries';
import { REMOVE_ADVENTURE, UPDATE_ADVENTURE } from '../utils/mutations';
import Auth from '../utils/auth';
import { QUERY_ADVENTURES, QUERY_ME } from '../utils/queries';
// import { removeAdventureId } from '../utils/localStorage';
import '../css/viewAdventures.css'


const AdventureList = ({
    adventures,
}) => {
    // Hooks must come first
    const [adventureForm, setAdventureForm] = useState({
        adventureTitle: '',
        adventureBody: '',
    })
    const [selectedAdventure, setSelectedAdventure] = useState()
    const [deleteAdventure] = useMutation(REMOVE_ADVENTURE);

    // set modal display state
    const [showModal, setShowModal] = useState(false);

    const [updateAdventure, { error }] = useMutation(UPDATE_ADVENTURE, {
        // const { loading, data } = useQuery(QUERY_ME);
        // const userData = data?.me || [];

        update(cache, { data: { updateAdventure } }) {
            try {
                const { adventure } = cache.readQuery({
                    query:
                        QUERY_ADVENTURES
                });

                cache.writeQuery({
                    query: QUERY_ADVENTURES,
                    data: { adventures: [updateAdventure, ...adventure] },
                })
            } catch (err) {
                console.error(err);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: {
                    me: {
                        ...me, adventure: [...me.adventures,
                            updateAdventure]
                    }
                },
            })
        }
    });

    const expandModal = (adventure) => {
        setSelectedAdventure(adventure);
        setShowModal(true);
    }

    if (!adventures.length) {
        return <h4>No adventures, yet. Create a new adventure!</h4>
    }

    const handleUpdateFormSubmit = async (event) => {
        event.preventDefault();
        let adventureId = event.target.dataset.key;
        setShowModal(false);
        try {
            const { data } = await updateAdventure({
                variables: {
                    ...adventureForm,
                    adventureId: adventureId,
                },
            });
            console.log(data);
            setAdventureForm({
                adventureTitle: '',
                adventureBody: '',
                characterCount: 0
            })

            // setAdventureTitle('');
            // setAdventureBody('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        // if (name === 'adventureTitle' && value.length <= 500) {
        setAdventureForm({
            ...adventureForm,
            [name]: value,
            characterCount: value.length
        })
        // setAdventureTitle(value);
        // setCharacterCount(value.length);
        // }
        // else if (name === 'adventureBody' && value.length <= 500) {
        //   setAdventureBody(value);
        //   setCharacterCount(value.length);
        // }
    };

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

        } catch (err) {
            console.error(err);
        }
    };

    // const handleUpdateAdventure = async (adventureId) => {
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;


    //     if (!token) {
    //         return false;
    //     }

    //     try {
    //         const updatedAdventure = await updateAdventure({
    //             variables: { adventureId }
    //         })
    //         if (!updatedAdventure) {
    //             console.log(`ERROR`)
    //         }

    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    return (
        <>
            {adventures.map(adventure => (
                <>
                    <Card className='viewTitle' key={adventure._id}>
                        <Card.Body>
                            <Card.Title>{adventure.adventureTitle}</Card.Title>
                            <p className='small'>by: {adventure.adventureAuthor}</p>
                            <Card.Body>
                                <div>
                                    <Card.Text >{adventure.adventureBody}</Card.Text>
                                </div>
                            </Card.Body>
                            <Button className='updateBtn btn-block btn-info' onClick={() => expandModal(adventure)} >Update Button</Button>
                            <Button className='deleteBtn btn-block btn-danger' onClick={() => handleDeleteAdventure(adventure._id)}>Delete Button</Button>
                        </Card.Body>
                    </Card>
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
            <Modal
                key={selectedAdventure && selectedAdventure._id}
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
                                    <Nav.Link className=" updateBtn active" eventKey='updateBtnModal'>Update Adventure: {selectedAdventure && selectedAdventure.adventureTitle}</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                        data-key={selectedAdventure && selectedAdventure._id} 
                        onSubmit={handleUpdateFormSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Adventure Title</Form.Label>
                                <textarea
                                    name='adventureTitle'
                                    onChange={handleChange}
                                    className="form-input w-100"
                                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                                >
                                    {selectedAdventure && selectedAdventure.adventureTitle}
                                </textarea>
                                <Form.Label className='mt-4'>Adventure Body</Form.Label>
                                <textarea
                                    name='adventureBody'
                                    onChange={handleChange}
                                    className="form-input w-100"
                                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                                >
                                    {selectedAdventure && selectedAdventure.adventureBody}
                                </textarea>
                                <Button 
                                
                                data-key={selectedAdventure && selectedAdventure._id}
                                className="btn-block mt-2" variant="success" type="submit" >Update This Adventure</Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Tab.Container>
            </Modal>
        </>
    )
}

export default AdventureList;

