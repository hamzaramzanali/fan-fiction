import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_ADVENTURE } from '../utils/mutations';
import { QUERY_ADVENTURES, QUERY_ME} from '../utils/queries';


import Auth from '../utils/auth';

const AddAdventure = () => {
  const [adventureTitle, setAdventureTitle] = useState('');
  const [adventureBody, setAdventureBody] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

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

    try {
      const { data } = await addAdventure({
        variables: {
          adventureTitle,
          adventureBody,
          adventureAuthor: Auth.getProfile().data.username,
        },
      });

      setAdventureTitle('');
      setAdventureBody('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'adventureTitle' && value.length <= 500) {
      setAdventureTitle(value);
      setCharacterCount(value.length);
    }
    else if (name === 'adventureBody' && value.length <= 500) {
      setAdventureBody(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Start an Adventure</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="adventureBody"
                placeholder="Once upon in the Marvel Universe..."
                value={adventureBody}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Submit Adventure
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/">login</Link> 
        </p>
      )}
    </div>
  );
 };

export default AddAdventure; 
