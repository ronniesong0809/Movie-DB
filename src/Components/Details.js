import React, { useEffect, useState } from "react";
import { Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "moment";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";

export const Details = (props) =>  {
    const [movie, setMovie] = useState([])
    
    useEffect(() => {
        const id = props.match.params.movieId;
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=6ffcd9d2ee08895aa6f5701e5362196b&language=en-US&page=1`;
        console.log(url)

        const fetchItems = url => {
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    if(!res.status_code){
                        setMovie(res)
                    }
                });
        };

        fetchItems(url);
    }, [props.match.params.movieId])

    return (
        <div>
            <img className="details-backdrop" alt={movie.backdrop_path} src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} />
            <div className="details-text">
                <Media>
                    <img
                        className="media-image mr-3"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.poster_path}
                    />
                    <Media.Body className="textShadowSmall">
                        <h1>{movie.title} ({moment(movie.release_date).format("YYYY")})</h1>
                        <span className="grayText">
                            {moment(movie.release_date).format("MM/DD/YYYY")}
                            {movie.genres && movie.genres.map(element => 
                                <span> • {element.name}</span>
                            )} • {Math.floor(movie.runtime/60)}h {movie.runtime%60}m
                        </span><br/>
                        <OverlayTrigger placement="right"
                            overlay={<Tooltip className="svgShadow">{movie.vote_average*10}% User Score</Tooltip>}>
                            <span>
                                <Rating
                                    emptySymbol={<FontAwesomeIcon color="gray" icon={faTicketAlt}/>}
                                    fullSymbol={<FontAwesomeIcon color="red" icon={faTicketAlt}/>}
                                    placeholderSymbol={<FontAwesomeIcon color="orange" icon={faTicketAlt}/>}
                                    placeholderRating={movie.vote_average/2}
                                    readonly
                                />
                            </span>
                        </OverlayTrigger>
                        <p>
                            {movie.tagline}
                        </p>
                        <h3>Overview</h3>
                        <p>
                            {movie.overview}
                        </p>
                    </Media.Body>
                </Media>
            </div>
        </div>
    )
}