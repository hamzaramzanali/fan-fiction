import React from 'react';
import { useState, useEffect } from "react"
import randomCharacterGenerator from '../utils/random';

// const heroesArr = [
//     "Captain America",
//     "Black Widow",
//     "Hulk"
// ]

 const CharacterGenerator = () => {
    const [results, setResults] = useState([]);

    const randomCharacter = async () => {
        const response = await randomCharacterGenerator();
        console.log(`RESPONSE: ${response.data.results[1].name}`);
        console.log("Random character response: " +response?.data?.results[0]);

        // if(response.code === 200) {
        //     setResults(response.data.results);
        //     return;
        // }
        setResults(response.data.results);
    };

    useEffect(() => {
        randomCharacter();
      }, []);

    return(
        <div>
            hello
        </div>

    );
}

export default CharacterGenerator;
