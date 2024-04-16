import React, { Component } from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import { Link } from 'react-router-dom';

class FeaturedMovies extends Component {
  constructor(props) {
    super(props);
    this.state = { imagesLoaded: 0 };
    this.flickityNode = React.createRef();
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }
  
  handleImageLoaded() {
    this.setState(prevState => ({
      imagesLoaded: prevState.imagesLoaded + 1
    }), () => {
      if (this.state.imagesLoaded === this.props.movies.length) {
        this.initializeFlickity();
      }
    });
  }

  initializeFlickity() {
    this.flickity = new Flickity(this.flickityNode.current, {
      cellAlign: 'left',
      contain: false,
      wrapAround: true,
      pageDots: false,
    });
  }

  componentDidMount() {
    // Flickity is initialized after all images have loaded
  }
  
  componentWillUnmount() {
    if (this.flickity) {
      this.flickity.destroy();
    }
  }
  
  render() {
    const { movies } = this.props;

    return (
      <div className="featured">
        <h2>Featured Films</h2>
        <div className="carousel" ref={this.flickityNode}>
          {movies.map((movie, index) => (
            <Link to={`/moviedetails/${movie.id}`} key={index} className="carousel-cell">
              <img src={movie.imageUrl} alt={movie.title} onLoad={this.handleImageLoaded} />
              <div className="title">{movie.title}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default FeaturedMovies;
