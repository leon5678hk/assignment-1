import React from 'react';
import MovieList from '../components/MovieList'; 
const MoviesPage = ({ movies }) => {
  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;