import { useState, useEffect } from "react"
import search from '../utils/API';

const SearchAllCharacters = () => {
  const [results, setResults] = useState([]);

  const searchCharacters = async () => {
    const response = await search();
    setResults(response.data.data.results);
  };
  
  useEffect(() => {
    searchCharacters();
  }, []);

  return (
    <ul className="list-group">
      {results.map((character) => (
        <li className="list-group-item" key={character.id}>
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="" />
            <div className="title">
              <h3>{character.name}</h3>
            </div>
        </li>
      ))}
    </ul>
  );
}

export default SearchAllCharacters;