import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Hero from './components/Hero'; 
import MoviesPage from './Pages/MoviesPage'; 
import MovieDetailPage from './Pages/MovieDetailPage';
import TVshowsPage from './Pages/TVshowsPage';
import TVShowDetailPage from './Pages/TVShowDetailPage';
import FeaturedTVshows from './components/FeaturedTVshows';
import FeaturedMovies from './components/FeaturedMovies';
import AdSection from './components/AdSection';
import Footer from './components/footer';
import './css/App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    fetchMovies();
    fetchTVShows();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:3000/movies');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchTVShows = async () => {
    try {
      const response = await fetch('http://localhost:3000/tvShows');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTvShows(data);
    } catch (error) {
      console.error('Error fetching TV shows:', error);
    }
  };

  return (
    <Router>
      <div>    
        <NavBar/>
        <Routes>
          <Route path="/" element={<>
            <Hero/>
            {movies.length > 0 && <FeaturedMovies movies={movies}/>}
            {tvShows.length > 0 && <FeaturedTVshows tvShows={tvShows}/>}

            {(movies.length > 0 && tvShows.length > 0) && <AdSection movies={movies} tvShows={tvShows} />}
          </>} />

          <Route path="/movies" element={<MoviesPage movies={movies} />} />
          <Route path="/tv" element={<TVshowsPage tvShows={tvShows} />} />
          <Route path="/moviedetails/:id" element={<MovieDetailPage movies={movies}/>} />
          <Route path="/tvshowdetail/:id" element={<TVShowDetailPage tvShows={tvShows} />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;