import { useState, useEffect } from "react"
import search from '../utils/baseAPI';
import { Button, Card, Modal, Nav, Tab, InputGroup, Form } from 'react-bootstrap';
import '../css/profilePage.css'
import { useMutation } from '@apollo/client';
import { ADD_ADVENTURE } from '../utils/mutations';
import { QUERY_ADVENTURES, QUERY_ME } from '../utils/queries';


const DailyCharacter = () => {
  const [character, setCharacter] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [adventureForm, setAdventureForm] = useState({
    adventureTitle: '',
    adventureBody: '',
    // characterCount: 0
  })

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

  const handleFormSubmit = async (event) => {
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
        <Button className='updateBtn btn-block btn-info' onClick={() => setShowModal(true)} >Write About {character.name}!</Button>
      </Card>
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
                  <Nav.Link className=" updateBtn active" eventKey='updateBtnModal'>Start Adventure for {character.name}</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
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
                {/* <textarea
                  name=
                  className ='form-input form-control'
                  
                  
                ></textarea> */}
                <Button className="btn-block mt-2" variant="success" type="submit" >Create This Adventure</Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  )
}


export default DailyCharacter;