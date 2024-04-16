import React, { Component } from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import { Link } from 'react-router-dom';

class FeaturedTVshows extends Component {
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
      if (this.state.imagesLoaded === this.props.tvShows.length) {
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
    const { tvShows } = this.props;

    return (
      <div className="featured">
        <h2>Featured TV Shows</h2>
        <div className="carousel" ref={this.flickityNode}>
          {tvShows.map((show, index) => (
            <Link to={`/tvshowdetail/${show.id}`} key={index} className="carousel-cell">
              <img src={show.imageUrl} alt={show.title} onLoad={this.handleImageLoaded} />
              <div className="title">{show.title}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default FeaturedTVshows;
