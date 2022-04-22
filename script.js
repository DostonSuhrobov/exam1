const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');

let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        const searchBar_value = document.getElementById('searchBar').value;
        const res = await fetch(`https://itunes.apple.com/search?term=${searchBar_value}&media=music&entity=album&attribute=artistTerm&limit=10`);
        
        hpCharacters = await res.json();

        console.log(typeof(hpCharacters));
        console.log(hpCharacters);

        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters.results
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.artistName}</h2>
                <br/>
                <p>House: ${character.collectionPrice}</p>
               
            </li>
        `;
        })
        .join('');
        console.log(typeof(characters));
        console.log(characters);
    charactersList.innerHTML = htmlString;
};

// [0].name


loadCharacters();



//: https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200
// https://itunes.apple.com/search?term=emma&media=music&entity=album&attribute=artistTerm&limit=200