const musicList = document.getElementById('music_list');
const searchBar = document.getElementById('searchBar');

let hpCharacters = [];

const loadMusic = async () => {
    try {
        const searchBar_value = document.getElementById('searchBar').value;
        const res = await fetch(`https://itunes.apple.com/search?term=${searchBar_value}&media=music&entity=album&attribute=artistTerm&limit=10`);
        
        hpCharacters = await res.json();

        displayMusic(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayMusic = (musics) => {
    const htmlString = musics.results
    .map((music) => {
    return `
    <div class="container">
    <div class="property-card">
      <a href="#">
        <div class="property-image">
         <img src="${music.artworkUrl100}"> 
          <div class="property-image-title">
          
          </div>
        </div></a>
      <div class="property-description">
        <h5>${music.artistName} </h5>
        <p>Copyright: ${music.copyright}</p>
      </div>
      <a href=${music.artistViewUrl}>
        <div class="property-social-icons">
          
        </div>
      </a>
    </div>
  </div>
   
    `}).join('');
        

        musicList.innerHTML = htmlString;
};


loadMusic();



//: https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200
// https://itunes.apple.com/search?term=emma&media=music&entity=album&attribute=artistTerm&limit=200