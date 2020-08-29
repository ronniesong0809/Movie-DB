import React, {useState, useEffect} from "react";
import { Carousel } from "react-bootstrap";
import "./stylesheet.css";

export const Hero = (props) => {
    const [heroImage, setHeroImage] = useState(null);
    
    useEffect(() => {
        setHeroImage(props.heroImage);
    }, [props.heroImage])

    return (
        <div className="hero">
            <Carousel>
            {heroImage ? (
                heroImage.map(element => 
                    <Carousel.Item>
                        <img alt="hero" className="d-block w-10"
                            src={`https://image.tmdb.org/t/p/w1280/${element.backdrop_path}`}
                        />
                        <Carousel.Caption className="textShadowSmall">
                            <h1>{element.original_title}</h1>
                            <h5>{element.overview}</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                )
            ) : null}
            </Carousel>
        </div>
    );
};