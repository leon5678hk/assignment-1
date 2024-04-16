import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('query');

        if (!query) {
            setSearchResults([]);
            return;
        }
              
        //fetch(`https://server-app-latest.onrender.com/search?query=${encodeURIComponent(query)}`)
        fetch(`http://localhost:3000/search?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data); 
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
                setSearchResults([]); 
            });
    }, [location.search]); 

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