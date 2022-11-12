import axios from 'axios';
const herroesArr = [
    "Hulk",
    "Captain America",
    "Black Widow",
    "Thor",
    "3-D Man",
    "Hawkeye",
    "Spider-Man"
]
let randomId = 0;
randomId += Math.floor(Math.random() * herroesArr.length)
console.log(randomId);
let hero = herroesArr[randomId];
hero = hero.replace(/ /g, "%20");
console.log(hero);
export const randomCharacterGenerator = async () => {
    let response = await axios.get(`https://gateway.marvel.com/v1/public/characters?name=${hero}&ts=1&apikey=1b59a5721097a34e22d115c829ed2043&hash=41968d567170fd402dc7e97f94a09889`);

    let data = await response.json();

    return data;
}

// export default randomCharacterGenerator;



