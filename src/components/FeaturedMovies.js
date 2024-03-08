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

    getRandomMovies(movies, count) {
        if (!Array.isArray(movies)) {
            return []; // Return empty array if movies is not an array
        }
        const shuffled = [...movies].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
  
    render() {
        const featuredMovies  = this.getRandomMovies(this.props.movies, 10);

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