import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SearchResults = ({ movies, tvShows }) => {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('query');

        if (!query) {
            setSearchResults([]);
            return;
        }

        const lowerCaseQuery = query.toLowerCase();

        const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(lowerCaseQuery)
        ).map(movie => ({ ...movie, type: 'movie' }));

        const filteredTvShows = tvShows.filter(tvShow =>
            tvShow.title.toLowerCase().includes(lowerCaseQuery)
        ).map(tvShow => ({ ...tvShow, type: 'tvShow' }));

        setSearchResults([...filteredMovies, ...filteredTvShows]);
    }, [location, movies, tvShows]);

    return (
        <div className="list-container">
            <h2 className="list-header">Search Results</h2>
            <div className="grid">
                {searchResults.map((result) => (
                    <Link to={result.type === 'movie' ? `/moviedetails/${result.id}` : `/tvshowdetail/${result.id}`}
                          key={result.id}
                          className="item">
                        <img src={result.imageUrl} alt={result.title} className="poster" />
                        <div className="list-title">{result.title}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
