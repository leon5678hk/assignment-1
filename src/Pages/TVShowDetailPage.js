import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoIosPlayCircle } from "react-icons/io";

const TVShowDetailPage = ({ tvShows }) => {
  let { id } = useParams();
  const tvShow = tvShows.find(tv => tv.id == id);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!tvShow) {
    return <div>TV Show not found</div>;
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-poster-container">
        <img src={tvShow.imageUrl} alt={tvShow.title} className="movie-poster" />
        <div className="trailer-button-container">
          <button className="watch-trailer-btn">
            <IoIosPlayCircle className="play-icon" />
            Watch Trailer
          </button>
        </div>
      </div>

      <div className="movie-details">
        <h2 className="movie-title">{tvShow.title}</h2>
        <p className="movie-intro">{tvShow.intro}</p>
        <p className="movie-rating"><strong>IMDb Rating: </strong>{tvShow.imdbRating} ★</p>
        <p className="movie-starring"><strong>Starring:</strong>  {tvShow.starring.join(', ')}</p>
        <p className="movie-genres"><strong>Genres:</strong>  {tvShow.genres.join(', ')}</p>
        <p className="tv-season"><strong>Season: </strong> {tvShow.seasons}</p>

        <div className="purchase-buttons">
          <button className="rent-button">Rent for ${tvShow.rentPrice}</button>
          <button className="buy-button">Buy for ${tvShow.purchasePrice}</button>
        </div>

        <Link to="/tv" className="back-button" onClick={scrollToTop}>Back to All TV shows</Link>
      </div>
    </div>
  );
};

export default TVShowDetailPage;