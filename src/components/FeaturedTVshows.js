import React from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import { Link } from 'react-router-dom';


class FeaturedTVshows extends React.Component {
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
    getFeaturedTVShows(tvShows) {
      return tvShows.filter(tvShows => tvShows.is_featured);
  }


  render() {
    const featuredTVShows = this.getFeaturedTVShows(this.props.tvShows);

    return (
        <div className="featured">
            <h2>Featured TV Shows</h2>
            <div className="carousel" ref={this.flickityNode}>
                {featuredTVShows.map((show, index) => (
                    <Link to={`/tvshowdetail/${show.id}`} key={index} className="carousel-cell">
                        <img src={show.imageUrl} alt={show.title} />
                        <div className="title">{show.title}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
}

export default FeaturedTVshows;