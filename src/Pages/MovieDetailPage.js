import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoIosPlayCircle } from "react-icons/io";

const MovieDetailPage = ({ movies }) => {
    let { id } = useParams();
    const movie = movies.find(movie => movie.id == id);
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!movie) {
        return <div>Movie not found</div>;
    }


    return (
        <div className="movie-detail-container">
            <div className="movie-poster-container">
                <img src={movie.imageUrl} alt={movie.title} className="movie-poster" />
                <div className="trailer-button-container">
                    <button className="watch-trailer-btn">
                        <IoIosPlayCircle className="play-icon" />
                        Watch Trailer
                    </button>
                </div>
            </div>


            <div className="movie-details">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-intro">{movie.intro}</p>
                <p className="movie-rating"><strong>IMDb Rating: </strong>{movie.imdbRating} ★</p>
                <p className="movie-starring"><strong>Starring:</strong>  {movie.starring}</p>
                <p className="movie-genres"><strong>Genres:</strong>  {movie.genres.join(', ')}</p>
                <p className="movie-duration"><strong>Duration: </strong> {movie.duration} minutes</p>

                <div className="purchase-buttons">
                    <button className="rent-button">Rent for ${movie.rentPrice}</button>
                    <button className="buy-button">Buy for ${movie.purchasePrice}</button>
                </div>

                <Link to="/movies" className="back-button" onClick={scrollToTop}>Back to All Movies</Link>

            </div>
        </div>
    );
};

export default MovieDetailPage;