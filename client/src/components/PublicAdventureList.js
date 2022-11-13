import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// const styles = {
//     textBody: {
//         width:
//     },
   
// }

const PublicAdventureList = ({
    adventures,
}) => {

    return (
        
        <Container>
            {adventures.map(adventure => (
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>{adventure.adventureTitle} </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Adventure Began with: {adventure.adventureAuthor}</Card.Subtitle>
                            <Card.Text>{adventure.adventureBody}</Card.Text>
                            <Button variant="success">Continue Adventure!</Button>
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
