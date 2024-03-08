import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
    return (
        <div className="list-container">
            <h2 className="list-header">All Movies</h2>
            <div className="grid">
                {movies.map((movie) => (
                    <Link to={`/moviedetails/${movie.id}`} key={movie.id} className="item">
                        <img src={movie.imageUrl} alt={movie.title} className="poster" />
                        <div className="list-title">{movie.title}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MovieList;