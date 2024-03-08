import React from 'react';
import TVShowList from '../components/TVshowList';
const TVshowsPage = ({ tvShows }) => {
    return (
    <div>
      <TVShowList tvShows={tvShows} />
    </div>
  );
};

export default TVshowsPage;