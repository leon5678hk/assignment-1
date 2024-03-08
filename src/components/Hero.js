import React, { useState, useEffect } from 'react';


const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { url: "https://teaser-trailer.com/wp-content/uploads/Polar-new-banner.jpg" },
        { url: "https://collider.com/wp-content/uploads/inception_movie_poster_banner_01.jpg" },
        { url: "https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-04.jpg"}
    ];

    const nextSlide = (offset) => {
        const newSlideIndex = (currentSlide + offset + slides.length) % slides.length;
        setCurrentSlide(newSlideIndex);
    };

    const setSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Change silde showing time here

        return () => clearInterval(timer); 
    }, [slides.length]);

    return (
        <section className="hero-banner-slider">
            {slides.map((slide, index) => (
                <div className={`mySlides fade ${index === currentSlide ? 'display' : ''}`} key={index}>
                    <div className="numbertext">{index + 1} / {slides.length}</div>
                    <img src={slide.url} alt={`Banner ${index + 1}`} style={{ width: "100%" }} />
                </div>
            ))}

            {/* Previous and Next buttons */}
            <a className="hero-prev" onClick={() => nextSlide(-1)}>❮</a>
            <a className="hero-next" onClick={() => nextSlide(1)}>❯</a>
            
            {/* dots */}
            <div className="dot-container">
                {slides.map((_, index) => (
                    <span className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setSlide(index)} key={index}></span>
                ))}
            </div>
        </section>
    );
};

export default Hero;