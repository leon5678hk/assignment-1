import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
import UserDashboard from './components/UserDashboard';
import SearchResults from './components/SearchResults';
import './css/App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [user, setUser] = useState(null); // State to store user data
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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
      const response = await fetch('http://localhost:3000/tvshows');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTvShows(data);
    } catch (error) {
      console.error('Error fetching TV shows:', error);
    }
  };

  const handleSuccessfulLogin = (userData) => {
    setUser(userData); // Store user data after successful login
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  };

  const handleSignOut = () => {
    setUser(null); // Reset user data
    localStorage.removeItem('user'); // Assuming you store user data in localStorage
  };

/*
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    const filteredResults = [...movies, ...tvShows]
      .filter(item => item.title.toLowerCase().includes(lowerCaseQuery))
      .map(item => ({
        ...item,
        type: item.duration ? 'movie' : 'tvShow' // Assuming duration is a property unique to movies
      }));

    setSearchResults(filteredResults);
  }, [searchQuery, movies, tvShows]); // Update results when query, movies, or tvShows change

*/

  return (
    <Router>
      <div>
      <NavBar user={user} onSuccessfulLogin={handleSuccessfulLogin} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={<>
            <Hero />
            {movies.length > 0 && <FeaturedMovies movies={movies} />}
            {tvShows.length > 0 && <FeaturedTVshows tvShows={tvShows} />}

            {(movies.length > 0 && tvShows.length > 0) && <AdSection movies={movies} tvShows={tvShows} />}
          </>} />

          <Route path="/movies" element={<MoviesPage movies={movies} />} />
          <Route path="/tv" element={<TVshowsPage tvShows={tvShows} />} />
          <Route path="/moviedetails/:id" element={<MovieDetailPage movies={movies} />} />
          <Route path="/tvshowdetail/:id" element={<TVShowDetailPage tvShows={tvShows} />} />
          <Route path="/dashboard" element={user ? <UserDashboard user={user} /> : <div>Please login to view this page</div>} />
          {/*<Route path="/search" element={<SearchResults searchResults={searchResults} searchQuery={searchQuery} />} />*/}
          <Route path="/search" element={<SearchResults movies={movies} tvShows={tvShows} />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;