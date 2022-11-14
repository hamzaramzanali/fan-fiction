import React from 'react';
import { useState, useEffect } from "react"
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { randomCharacterGenerator } from '../utils/random';
import Auth from '../utils/auth';
import '../css/profilePage.css'

const CharacterGenerator = async () => {
    const [randomCharacter, setRandomCharacter] = useState([]);

    try {
        let response = await randomCharacterGenerator();
        response = response.data.results;

        const characterData = response.map((character) => ({
            // fields correspond to character model
            characterId: character.id,
            description: character.description || ['No description to display'],
            name: character.name,
            //   image: character.thumbnail?.path || '',
        }));

        setRandomCharacter(characterData);
    }
    catch (err) {
        console.error(err);
    }

    useEffect(() => {
        randomCharacter();
    }, []);

    return (
        <>
            <Container>
                <CardColumns className='characterCard'>
                    {randomCharacter?.map((character) => {
                        return (
                            <Card key={character.characterId} border='dark'>
                                {character.image ? (
                                    <Card.Img src={character.image} alt={`The picture for ${character.name}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{character.name}</Card.Title>
                                    <p className='small'>Description: {character.description}</p>
                                    <Card.Text>{character.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default CharacterGenerator;
