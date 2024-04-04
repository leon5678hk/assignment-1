import React from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import { Link } from 'react-router-dom';


class FeaturedMovies extends React.Component {
    constructor(props) {
      super(props);
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

    getFeaturedMovies(movies) {
      return movies.filter(movie => movie.is_featured);
  }
  
    render() {
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