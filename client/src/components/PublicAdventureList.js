import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal, Form, InputGroup } from 'react-bootstrap';

//className to text so user can only see a snippet forcing them to click on it to hopefully add their continuation 


const styles = {
    card: {
        width: 350
    },
}

const PublicAdventureList = ({
    adventures,
}) => {
   
    return (

        <Container>
            {adventures.map(adventure => (
                <Row>
                    <Col>
                        <Card key={adventure._id} style={styles.card}>
                            <Card.Body>
                                <Card.Title>{adventure.adventureTitle} </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Adventure Began with: {adventure.adventureAuthor}</Card.Subtitle>
                                <Card.Text className="d-inline-block text-truncate" style={{maxWidth: 150}}>{adventure.adventureBody}</Card.Text>
                                <Link
                                    className="btn btn-primary btn-block btn-squared"
                                    to={`/adventure/${adventure._id}`}
                                    > Continue Adventure!
                                </Link>
                            </Card.Body>
                            <Card.Footer className="text-muted">Adventure Began on: {adventure.createdAt}</Card.Footer>
                        </Card>
                    </Col>
                </Row>
            ))}
        </Container>





    );
};

export default PublicAdventureList;
