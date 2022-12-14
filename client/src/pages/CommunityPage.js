import React from 'react';
import { useQuery } from '@apollo/client';
import PublicAdventureList from '../components/PublicAdventureList';
import { QUERY_ADVENTURES } from '../utils/queries';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

const CommunityPage = () => {
  const { loading, data } = useQuery(QUERY_ADVENTURES);
  const adventures = data?.getAdventures || [];
  
  return (
    <>
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Title>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <PublicAdventureList
                  adventures={adventures}
                  title="Community Adventures"
                />
              )}
            </Card.Title>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}



export default CommunityPage;

