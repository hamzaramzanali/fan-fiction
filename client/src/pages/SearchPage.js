// NOTE TO SELF: ADD A CONDITION THAT PRINTS WHEN USER ENTERS WRONG CHARACTER
// 

import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import "../css/searchPage.css"

import { useMutation } from '@apollo/client';

import { SAVE_CHARACTER } from '../utils/mutations';

import Auth from '../utils/auth';
import { searchMarvelCharacters } from '../utils/searchCharacterAPI';
import { saveCharacterIds, getSavedCharacterIds } from '../utils/localStorage';

const SearchCharacters = () => {
    // create state for holding returned marvel api data
    const [searchedCharacters, setSearchedCharacters] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');
  
    // create state to hold saved characterId values
    const [savedCharacterIds, setSavedCharacterIds] = useState(getSavedCharacterIds());
    
    // set up useEffect hook to save `savedCharacterIds` list to localStorage on component unmount
    // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    useEffect(() => {
      return () => saveCharacterIds(savedCharacterIds);
    });
    
    const [saveCharacter] = useMutation(SAVE_CHARACTER);
  
    // create method to search for characters and set state on form submit
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      if (!searchInput) {
        return false;
      }
  
      try {
        let response = await searchMarvelCharacters(searchInput);
        console.log(`RESPONSE: ${response.data}`);
        response = response.data.results;
        // if (!response.ok) {
        //   throw new Error('something went wrong!');
        // }
  
        // const { items } = await response.json();
        // const { items } = await response;
        // console.log(`ITEMS: ${items}`)
        const characterData = response.map((character) => ({
            // fields correspond to character model
          characterId: character.id,
          description: character.description || ['No description to display'],
          name: character.name,
        //   image: character.thumbnail?.path || '',
        }));
  
        setSearchedCharacters(characterData);
        setSearchInput('');
      } catch (err) {
        console.error(err);
      }
    };
  
    // create function to handle saving a character to our database
    const handleSaveCharacter = async (characterId) => { 
      // find the character in `searchedCharacterss` state by the matching id
      const characterToSave = searchedCharacters.find((character) => character.characterId === characterId);
  
      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        // const response = await saveCharacter(characterToSave, token);
        await saveCharacter({
          // grabbing characterInput from mutations and giving back character information to save
          variables: { characterInput: characterToSave}
        })
  
        // if character successfully saves to user's account, save character id to state
        setSavedCharacterIds([...savedCharacterIds, characterToSave.characterId]);
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
                <Card className ="searchCard" key={character.characterId}>
                  {character.image ? (
                    <Card.Img src={character.image} alt={`The picture for ${character.name}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{character.name}</Card.Title>
                    <p className='small'>Description: {character.description}</p>
                    <Card.Text>{character.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedCharacterIds?.some((savedCharacterId) => savedCharacterId === character.characterId)}
                        className='btn-block btn-info btnDesign'
                        onClick={() => handleSaveCharacter(character.characterId)}>
                        {savedCharacterIds?.some((savedCharacterId) => savedCharacterId === character.characterId)
                          ? 'This character has already been saved!'
                          : 'Save this character!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </Container>
      </>
    );
  };
  
  export default SearchCharacters;
