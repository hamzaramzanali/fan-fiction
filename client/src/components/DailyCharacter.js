import { useState, useEffect } from "react"
import search from '../utils/baseAPI';
import { Container, Card, CardGroup, Col, Row,  Image } from 'react-bootstrap';



const DailyCharacter = () => {
  
  const [character1, setCharacter1] = useState([]);
  const [character2, setCharacter2] = useState({});

  const searchCharacter1 = async () => {
    const response = await search();
    setCharacter1(response.data.data.results[Math.floor(Math.random() * 100)]);

  };

  const searchCharacter2 = async () => {
    const response = await search();
    setCharacter2(response.data.data.results[Math.floor(Math.random() * 100)]);

  };

  useEffect(() => {
        searchCharacter1();
      }, []);

      useEffect(() => {
        searchCharacter2();
      }, []);

  return (
    <Container>
      <Row>
        <Col>Today's Marvel Showdown</Col>
      </Row>
    <CardGroup>
      
        <Card>
        
          {/* <Card.Img src= {character1.thumbnail.path+".jpg"} alt="" /> */}
     
          <Card.Body>
            <Card.Title>{character1.name}</Card.Title>
            <Card.Text>
            {character1.description}
            </Card.Text>
          </Card.Body>
        </Card> 

        <Card>
        
          {/* <Card.Img src= {character2.thumbnail.path+".jpg"} alt=""/> */}
     
          <Card.Body>
            <Card.Title>{character2.name}</Card.Title>
            <Card.Text>
            {character2.description}
            </Card.Text>
          </Card.Body>
        </Card> 
  </CardGroup>
  </Container>
  )
}


export default DailyCharacter; 

// let character1 = Math.floor(Math.random() * 100)
//   let character2 = character1 + 2;
//   const [results, setResults] = useState([]);

//   const searchCharacters = async () => {
//     const response = await search();
//     setResults(response.data.data.results);
//     console.log(results);

//   };

//   useEffect(() => {
//     searchCharacters();
//   }, []);

//   return (
//     <Container>
//       <Row>
//         <Col>Today's Marvel Showdown</Col>
//       </Row>
//     <CardGroup>
//       {results.slice(character1, character2).map((character) => (
//         <Card key = { character.id }>
        
//           <Card.Img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="" />
     
//           <Card.Body>
//             <Card.Title>{character.name}</Card.Title>
//             <Card.Text>
//             {character.description}
//             </Card.Text>
//           </Card.Body>
//         </Card> 
//       ))}
//   </CardGroup>
//   </Container>
//   )
// }
