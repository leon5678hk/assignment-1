import React from 'react';
import { Link } from 'react-router-dom';

const TVShowList = ({ tvShows }) => {
    return (
        <div className="list-container">
            <h2 className="list-header">All TV Shows</h2>
            <div className="grid">
                {tvShows.map((item) => (
                    <Link to={`/tvshowdetail/${item.id}`} key={item.id} className="item">
                        <img src={item.imageUrl} alt={item.title} className="poster" />
                        <div className="list-title">{item.title}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TVShowList;
