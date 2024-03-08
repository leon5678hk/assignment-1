import React from 'react';


const AdSection = ({ movies, tvShows }) => {

    const getRandomItems = (items, count) => {
        const shuffled = items.sort(() => 0.5 - Math.random());//-ve ->sorted to lower index,=0 unchange,+ve higher index
        return shuffled.slice(0, count);
    };

    // Get 5 random movies and TV shows
    const randomMovies = getRandomItems(movies, 5);
    const randomTVShows = getRandomItems(tvShows, 5);

    const combinedItems = [...randomMovies, ...randomTVShows]
                             .sort(() => 0.5 - Math.random());

    return (
      <div className="adSection">
        <div className="priceTagContainer">
          <div className="priceTag">
            $5.99
          </div>
          <div className="cinemaSpotlight">
            CINEMA SPOTLIGHT
          </div>
        </div>
        <div className="movieImages">
        {combinedItems.map((item, index) => (
            <div key={index} className="movieImageContainer">
              <img src={item.imageUrl} alt={item.title}  className="movieImage" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default AdSection;