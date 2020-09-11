import React, { useEffect, useState } from "react";
import { Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "moment";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { DiscussionEmbed } from "disqus-react";

export const Details = (props) => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const id = props.match.params.movieId;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=6ffcd9d2ee08895aa6f5701e5362196b&language=en-US&page=1`;
    console.log(url);

    const fetchItems = (url) => {
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if (!res.status_code) {
            setMovie(res);
          }
        });
    };

    fetchItems(url);
  }, [props.match.params.movieId]);

  return (
    <div>
      {movie.title && (
        <div>
          <div className="details-text">
            <Media>
              {movie.poster_path && (
                <img
                  className="media-image mr-3"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.poster_path}
                />
              )}
              {!movie.poster_path && (
                <img
                  className="media-image mr-3"
                  src={process.env.PUBLIC_URL + "images/placeholder.png"}
                  alt={movie.poster_path}
                />
              )}
              <Media.Body className="textShadowSmall">
                <h1>
                  {movie.title} ({moment(movie.release_date).format("YYYY")})
                </h1>
                <span className="whiteText">
                  {moment(movie.release_date).format("MM/DD/YYYY")}
                  {movie.genres &&
                    movie.genres.map((element, key) => (
                      <span key={key}> • {element.name}</span>
                    ))}{" "}
                  • {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
                <br />
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip className="svgShadow">
                      {movie.vote_average * 10}% User Score
                    </Tooltip>
                  }
                >
                  <span>
                    <Rating
                      emptySymbol={
                        <FontAwesomeIcon color="gray" icon={faTicketAlt} />
                      }
                      fullSymbol={
                        <FontAwesomeIcon color="red" icon={faTicketAlt} />
                      }
                      placeholderSymbol={
                        <FontAwesomeIcon color="orange" icon={faTicketAlt} />
                      }
                      placeholderRating={movie.vote_average / 2}
                      readonly
                    />
                  </span>
                </OverlayTrigger>{" "}
                <small>from {movie.vote_count} Ratings</small>
                <p>{movie.tagline}</p>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </Media.Body>
            </Media>
            <DiscussionEmbed
              className="Disqus"
              shortname="the-movie-db"
              config={{
                url: "https://the-movie-db.vercel.app/movie/" + movie.id,
                identifier: "" + movie.id,
                title: movie.title,
              }}
            />
          </div>
          {movie.backdrop_path && (
            <img
              className="details-backdrop"
              alt={movie.backdrop_path}
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            />
          )}
          {!movie.backdrop_path && (
            <img
              className="details-backdrop"
              alt={movie.backdrop_path}
              src={process.env.PUBLIC_URL + "images/placeholder.png"}
            />
          )}
        </div>
      )}
    </div>
  );
};
