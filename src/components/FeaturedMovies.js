import React from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import { Link } from 'react-router-dom';


class FeaturedMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [] // Initialize movies in the state
    };
    this.flickityNode = React.createRef();
  }
  
    componentDidMount() {
        this.flickity = new Flickity(this.flickityNode.current, {
          cellAlign: 'left',
          contain: false,
          wrapAround: true,
          pageDots: false,

        });
      }
  
    componentWillUnmount() {
      this.flickity.destroy();
    }

    fetchFeaturedMovies() {
      // Fetch movies from the server
      //fetch('https://server-app-latest.onrender.com/movies?isFeatured=true')
      fetch('https://localhost:3000/movies?isFeatured=true')
        .then(response => response.json())
        .then(data => this.setState({ movies: data }))
        .catch(error => console.error('Error fetching featured movies:', error));
    }

    getFeaturedMovies(movies) {
      return movies.filter(movie => movie.is_featured);
  }
  
    render() {
        const { movies } = this.state;

      const featuredMovies = this.getFeaturedMovies(this.props.movies);

        return (
            <div className="featured">
                <h2>Featured Films</h2>
                <div className="carousel" ref={this.flickityNode}>
                    {featuredMovies .map((movie, index) => (
                        <Link to={`/moviedetails/${movie.id}`} key={index} className="carousel-cell">
                            <img src={movie.imageUrl} alt={movie.title} />
                            <div className="title">{movie.title}</div>
                        </Link>
                    ))}
                </div>
            </div>
        );
      }
  }
  
  export default FeaturedMovies;