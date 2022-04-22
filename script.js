const musicList = document.getElementById('music_list');
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
    displayMusic(filteredCharacters);
});

const loadMusic = async () => {
    try {
        const searchBar_value = document.getElementById('searchBar').value;
        const res = await fetch(`https://itunes.apple.com/search?term=${searchBar_value}&media=music&entity=album&attribute=artistTerm&limit=10`);
        
        hpCharacters = await res.json();

        console.log(typeof(hpCharacters));
        console.log(hpCharacters);

        displayMusic(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayMusic = (musics) => {
    const htmlString = musics.results
        .map((music) => {
            return `
            <li class="character">
            <img src="${music.artworkUrl60}">
                <h2>${music.artistName}</h2>
                <br/>
                <p>Copyright: ${music.copyright}</p>

            </li>
        `;
        })
        .join('');

        musicList.innerHTML = htmlString;
};


loadMusic();



//: https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200
// https://itunes.apple.com/search?term=emma&media=music&entity=album&attribute=artistTerm&limit=200