import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'


const PublicAdventureList = ({
    adventures,
}) => {

    return (
        
        <Container>
            {adventures.map(adventure => (
            <Row>
                <Col>
                    <Card>
                        <Card.Title>{adventure.adventureTitle}</Card.Title>
                        <Card.Body>{adventure.adventureBody}</Card.Body>
                    </Card>
                </Col>
            </Row>
             ))}
        </Container>
        
        
        
    );
};

export default PublicAdventureList;
