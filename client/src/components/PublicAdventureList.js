import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../css/publicAdventures.css'

const PublicAdventureList = ({
    adventures,
}) => {

    return (
        <>
            <div className='communityCard'>
                <h2 className='communityTitle'>Welcome to the Community Adventures!</h2>
                <Container>
                    {adventures.map(adventure => (
                        <Row>
                            <Col>
                                <Card key={adventure._id} >
                                    <Card.Body>
                                        <Card.Title className='cardTitle'>{adventure.adventureTitle} </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Adventure Began with: {adventure.adventureAuthor}</Card.Subtitle>
                                        <Card.Text className="d-inline-block text-truncate" style={{ maxWidth: "150rem" }}>{adventure.adventureBody}</Card.Text>
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
        </>
    );
};

export default PublicAdventureList;
