import axios from 'axios';

const search = () =>
  axios.get(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=1b59a5721097a34e22d115c829ed2043&hash=41968d567170fd402dc7e97f94a09889`);

export default search;


// // this is to search for a character right now
// export const search = () =>
//   axios.get(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=1b59a5721097a34e22d115c829ed2043&hash=41968d567170fd402dc7e97f94a09889`);


// // // this is the search character template for the future
// // export const searchGoogleBooks = (query) => {
// //   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// // };

// // this is the pull up for random character
// function getRandomNumber(max) {
//   return Math.floor(Math.random() * max);
// }

// export const randomCharacterGenerator = () => axios.get(``)






// // api/cod
// router.get('/', (req, res) => {
//   axios.get(`https://thronesapi.com/api/v2/Characters/${getRandomInt(52)}`)
//     .then(response => {
//       console.log(response.data);
//       res.json(response.data)
//     })
// });
// module.exports = router
