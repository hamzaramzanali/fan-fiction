import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, InputGroup } from 'react-bootstrap';

const styles = {
    card: {
        width: 350
    },

    cardText: {
        width: 300
    }

}

const PublicAdventureList = ({
    adventures,
}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <Container>
            {adventures.map(adventure => (
                <Row>
                    <Col>
                        <Card key={adventure._id}>
                            <Card.Body>
                                <Card.Title>{adventure.adventureTitle} </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Adventure Began with: {adventure.adventureAuthor}</Card.Subtitle>
                                <Card.Text>{adventure.adventureBody}</Card.Text>
                                <Button variant="success" onClick={handleShow}>Continue Adventure!</Button>
                            </Card.Body>
                            <Card.Footer className="text-muted">Adventure Began on: {adventure.createdAt}</Card.Footer>
                        </Card>
                        
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{adventure.adventureTitle}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{adventure.adventureBody}</Modal.Body>
                            <InputGroup>
                                <InputGroup.Text>With textarea</InputGroup.Text>
                                <Form.Control as="textarea" aria-label="With textarea" />
                            </InputGroup>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            ))}
        </Container>





    );
};

export default PublicAdventureList;
