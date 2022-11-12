export const getSavedCharacterIds = () => {
    const savedCharacterIds = localStorage.getItem('saved_characters')
        ? JSON.parse(localStorage.getItem('saved_characters'))
        : [];

    return savedCharacterIds;
};

export const saveCharacterIds = (characterIdArr) => {
    if (characterIdArr.length) {
        localStorage.setItem('saved_characters', JSON.stringify(characterIdArr));
    } else {
        localStorage.removeItem('saved_characters');
    }
};

export const removeCharacterId = (characterId) => {
    const savedCharacterIds = localStorage.getItem('saved_characters')
        ? JSON.parse(localStorage.getItem('saved_characters'))
        : null;

    if (!savedCharacterIds) {
        return false;
    }

    const updatedSavedCharacterIds = savedCharacterIds?.filter((savedCharacterId) => savedCharacterId !== characterId);
    localStorage.setItem('saved_characters', JSON.stringify(updatedSavedCharacterIds));

    return true;
};

