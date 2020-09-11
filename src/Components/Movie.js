import React, { useState, useEffect } from "react";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "./stylesheet.css";

export const Movie = (props) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setMovie(props.Movie);
  }, [props.Movie]);

  return (
    <div className="">
      {movie ? (
        <Card className="card text-left m-3 movieShadow">
          {movie.backdrop_path && (
            <Card.Img
              className="cardImage"
              variant="top"
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            />
          )}
          {!movie.backdrop_path && (
            <Card.Img
              className="cardImage"
              variant="top"
              src={process.env.PUBLIC_URL + "images/placeholder.png"}
            />
          )}
          <Card.Body>
            <Card.Title>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip className="svgShadow">{movie.title}</Tooltip>}
              >
                <span>{movie.original_title}</span>
              </OverlayTrigger>
            </Card.Title>
            <Card.Subtitle className="mb-2">
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
              <time
                className="grayText"
                title={moment(movie.release_date).format("LLLL")}
              >
                {moment(movie.release_date).format("LL")}
              </time>
            </Card.Subtitle>
            <Card.Text>{movie.overview}</Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex">
            <time
              className="m-2 grayText"
              title={moment(movie.release_date).format("LLLL")}
            >
              {moment(movie.release_date).fromNow()}
            </time>
            <Button
              className="ml-auto"
              variant="primary"
              href={`/movie/${movie.id}`}
            >
              Read More
            </Button>
          </Card.Footer>
        </Card>
      ) : null}
    </div>
  );
};
