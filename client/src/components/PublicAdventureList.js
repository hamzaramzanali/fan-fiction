import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import '../css/publicAdventures.css'

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
        <div className='communityCard'>
            <h2 className='communityTitle'>Welcome to the Community Adventures!</h2>            
        <Container>
            {adventures.map(adventure => (
                <Row className="border">
                    <Col>
                        <Card key={adventure._id} style={styles.card}>
                            <Card.Body>
                                <Card.Title className='cardTitle'>{adventure.adventureTitle} </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Adventure Began with: {adventure.adventureAuthor}</Card.Subtitle>
                                <Card.Text className="d-inline-block text-truncate" style={{maxWidth: 150}}>{adventure.adventureBody}</Card.Text>
                                <Link
                                    className="continueAdventureBtn btn btn-primary btn-block btn-squared"
                                    to={`/adventure/${adventure._id}`}
                                    > Continue Adventure!
                                </Link>
                            </Card.Body>
                            <Card.Footer className="adventureText text-muted">Adventure Began on: {adventure.createdAt}</Card.Footer>
                        </Card>
                    </Col>
                </Row>
            ))}
        </Container>
        </div>





    );
};

export default PublicAdventureList;
