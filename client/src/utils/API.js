import axios from 'axios';

const search = () =>
  axios.get(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=1b59a5721097a34e22d115c829ed2043&hash=41968d567170fd402dc7e97f94a09889`);

export default search;
