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
import UserDashboard from './components/UserDashboard';
import SearchResults from './components/SearchResults';
import './css/App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [featuredTVShows, setFeaturedTVShows] = useState([]); 
  const [user, setUser] = useState(null); 
  //const apiUrl = "https://server-app-latest.onrender.com";//delopyed link
  const apiUrl = "http://localhost:3000";


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchMovies();
    fetchTVShows();
    fetchFeaturedMovies();
    fetchFeaturedTVShows(); 
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${apiUrl}/movies`);
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
      const response = await fetch(`${apiUrl}/tvshows`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTvShows(data);
    } catch (error) {
      console.error('Error fetching TV shows:', error);
    }
  };


  const fetchFeaturedMovies = async () => {
    try {
      const response = await fetch(`${apiUrl}/movies?isFeatured=true`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFeaturedMovies(data);
    } catch (error) {
      console.error('Error fetching featured movies:', error);
    }
  };

  const fetchFeaturedTVShows = async () => { 
    try {
      const response = await fetch(`${apiUrl}/tvshows?isFeatured=true`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFeaturedTVShows(data); 
    } catch (error) {
      console.error('Error fetching featured TV shows:', error);
    }
  };

  const handleSuccessfulLogin = (userData) => {
    setUser(userData); // Store user data after successful login
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  };

  const handleSignOut = () => {
    setUser(null); // Reset user data
    localStorage.removeItem('user'); // clear localStorage
  };

  return (
    <Router>
      <div>
        <NavBar user={user} onSuccessfulLogin={handleSuccessfulLogin} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={<>
            <Hero />
            {<FeaturedMovies movies={featuredMovies} />}
            {<FeaturedTVshows tvShows={featuredTVShows} />}
            <AdSection movies={movies} tvShows={tvShows} />
          </>} />

          <Route path="/movies" element={<MoviesPage movies={movies} />} />
          <Route path="/tv" element={<TVshowsPage tvShows={tvShows} />} />
          <Route path="/moviedetails/:id" element={<MovieDetailPage movies={movies} />} />
          <Route path="/tvshowdetail/:id" element={<TVShowDetailPage tvShows={tvShows} />} />
          <Route path="/dashboard" element={user ? <UserDashboard user={user} /> : <div style={{ color: 'white', textAlign: 'center' }}><h1>Please login to view this page</h1></div>}/>
          <Route path="/search" element={<SearchResults />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;