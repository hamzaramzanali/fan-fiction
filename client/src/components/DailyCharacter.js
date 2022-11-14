import { useState, useEffect } from "react"
import search from '../utils/baseAPI';
import { Card } from 'react-bootstrap';
import '../css/profilePage.css'

const DailyCharacter = () => {

  const [character, setCharacter] = useState([]);

  const searchCharacter = async () => {
    const response = await search();
    setCharacter(response.data.data.results[Math.floor(Math.random() * 100)]);
  };

  useEffect(() => {
    searchCharacter();
  }, []);

  return (
    <>
      <Card className="characterCard">
        <Card.Body>
          <Card.Title>Random Character</Card.Title>
          <Card.Text>
            {character.name}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default DailyCharacter;

