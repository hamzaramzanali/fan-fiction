// route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });
};

export const createUser = (userData) => {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const loginUser = (userData) => {
    return fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const searchMarvelCharacters = async (query) => {
    query = query.replace(/ /g, "%20");
    console.log(query);

    console.log(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=1b59a5721097a34e22d115c829ed2043&hash=41968d567170fd402dc7e97f94a09889`);

    let response = await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=1b59a5721097a34e22d115c829ed2043&hash=41968d567170fd402dc7e97f94a09889`);
    let data = await response.json();
    console.log(`DATA: ${data.data.results}`);

    // return fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=1b59a5721097a34e22d115c829ed2043&hash=41968d567170fd402dc7e97f94a09889`);
    
    return data;
};

