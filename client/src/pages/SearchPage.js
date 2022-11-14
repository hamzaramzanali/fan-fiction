// NOTE TO SELF: ADD A CONDITION THAT PRINTS WHEN USER ENTERS WRONG CHARACTER
// 

import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, Modal, Nav, Tab } from 'react-bootstrap';
import "../css/searchPage.css"

import { useMutation } from '@apollo/client';
import { ADD_ADVENTURE } from '../utils/mutations';
import { QUERY_ADVENTURES, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { searchMarvelCharacters } from '../utils/searchCharacterAPI';

const SearchCharacters = () => {
  // create state for holding returned marvel api data
  const [searchedCharacters, setSearchedCharacters] = useState([]);
  const [selectedHero, setSelectedHero] = useState()
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [adventureForm, setAdventureForm] = useState({
    adventureTitle: '',
    adventureBody: '',
  })
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  const [addAdventure, { error }] = useMutation(ADD_ADVENTURE, {
    update(cache, { data: { addAdventure } }) {
      try {
        const { adventure } = cache.readQuery({ query: QUERY_ADVENTURES });

        cache.writeQuery({
          query: QUERY_ADVENTURES,
          data: { adventures: [addAdventure, ...adventure] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, adventure: [...me.adventures, addAdventure] } },
      });
    },
  });

  const expandModal = (character) => {
    setSelectedHero(character);
    setShowModal(true);
  }

  const handleAddStoryFormSubmit = async (event) => {
    event.preventDefault();
    setShowModal(false)
    try {
      const { data } = await addAdventure({
        variables: {
          ...adventureForm,
          // adventureTitle,
          // adventureBody,
          // adventureAuthor: Auth.getProfile().data.username,
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


  // create method to search for characters and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      setErrMessage(`Sorry, ${searchInput} is not in database!`);
    }

    try {
      let response = await searchMarvelCharacters(searchInput);
      // if (!response) {
      //   throw new Error('something went wrong!');
      // }
      // else if (response) {
      //   return response = response.data.results;
      // };

      response = response.data.results;
      
      // console.log(`RESPONSE: ${response.data}`);

      // if (!response) {
      //   alert('Character input wrong. Please try again');
      //   // window.location.reload();
      //   // throw new Error('something went wrong!');
      // }

      // const { items } = await response.json();
      // const { items } = await response;
      // console.log(`ITEMS: ${items}`)
      const characterData = response.map((character) => ({
        // fields correspond to character model
        characterId: character.id,
        description: character.description || ['No description to display'],
        name: character.name,
        image: character.thumbnail.path
      }));

      setSearchedCharacters(characterData);
      console.log(characterData)
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text bg jumbo'>
        <Container>
          <h1 className='searchTitle'>Search for Characters!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a character'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button className="btnIcon" type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container className='resultsPage'>
        <h2 className='searchedTitle'>
        {searchedCharacters?.length
            ? `Viewing ${searchedCharacters.length} results:`
            : 'Search for a character to begin'}
        </h2>
        <CardColumns>
          {searchedCharacters?.map((character) => {
            return (
              <>
                <Card className="searchCard" key={character.characterId}>
                  {character.image ? (
                    <Card.Img src={`${character.image}.jpg`} alt={`The picture for ${character.name}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title className='characterName'>{character.name}</Card.Title>
                    <p className='small'>Description: {character.description}</p>
                    <Card.Text>{character.description}</Card.Text>
                    <Button className='updateBtn btn-block btn-info' onClick={() => expandModal(character)} >Write About {character.name}!</Button>
                  </Card.Body>
                </Card>
              </>
            );
          })}
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
                      <Nav.Link className=" updateBtn active" eventKey='updateBtnModal'>Start Adventure for {selectedHero && selectedHero.name}</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleAddStoryFormSubmit}>
                  <Form.Group className="mb-3" >
                    <Form.Label>Adventure Title</Form.Label>
                    <Form.Control
                      name='adventureTitle'
                      className="form-input form-control"
                      value={adventureForm.adventureTitle}
                      onChange={handleChange} />
                    <Form.Label className='mt-4'>Adventure Body</Form.Label>
                    <Form.Control
                      name='adventureBody'
                      className="form-input"
                      as="textarea"
                      style={{ height: '100px' }}
                      value={adventureForm.adventureBody}
                      onChange={handleChange}
                    />
                    <Button className="btn-block mt-2" variant="success" type="submit" >Create This Adventure</Button>
                  </Form.Group>
                </Form>
              </Modal.Body>
            </Tab.Container>
          </Modal>
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchCharacters;
