import React from 'react';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';

// import { ADD_ADVENTURE } from '../utils/mutations';


// import Auth from '../utils/auth';

const AddAdventure = () => {
  // const [adevntureBody, setAdventureBody] = useState('');

  // const [characterCount, setCharacterCount] = useState(0);

//   const [addAdventure, { error }] = useMutation(ADD_THOUGHT, {
//     update(cache, { data: { addAdventure } }) {
//       try {
//         const { adventure } = cache.readQuery({ query: QUERY_THOUGHTS });

//         cache.writeQuery({
//           query: QUERY_THOUGHTS,
//           data: { adventure: [addAdventure, ...thoughts] },
//         });
//       } catch (e) {
//         console.error(e);
//       }

//       // update me object's cache
//       const { me } = cache.readQuery({ query: QUERY_ME });
//       cache.writeQuery({
//         query: QUERY_ME,
//         data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
//       });
//     },
//   });

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const { data } = await addAdventure({
  //       variables: {
  //         adventureBody,
  //         adventureAuthor: Auth.getProfile().data.username,
  //       },
  //     });

  //     setAdventureBody('');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   if (name === 'adventureBody' && value.length <= 500) {
  //     setAdventureBody(value);
  //     setCharacterCount(value.length);
  //   }
  // };

  return (
    <div>
      <h3>Start Your Adventure!</h3>

      
        <>
          <p
           
          >
            Character Count: 
          </p>
          <form
           
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="adventureBody"
                placeholder="Once upon a time.. "
                
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Adventure
              </button>
            </div>
           
              <div className="col-12 my-3 bg-danger text-white p-3">
               
              </div>
            
          </form>
        </>
     
        <p>
          You need to be logged in to start adventure. Please{' '}
         
        </p>
     
    </div>
  );
};

export default AddAdventure;
