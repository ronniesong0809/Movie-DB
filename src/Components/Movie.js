import React, {useState, useEffect} from "react";
import "./stylesheet.css";
import { Card, Button } from "react-bootstrap";

export const Movie = (props) => {
    const [movie, setMovie] = useState(null);
    
    useEffect(() => {
        setMovie(props.Movie);
    }, [props.Movie])

    return (
        <div className="">
            {movie ? (
                <Card className="text-left m-3 movieShadow">
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} />
                    <Card.Body>
                        <Card.Title>{movie.original_title}</Card.Title>
                        <Card.Text>
                            {movie.overview}
                        </Card.Text>
                        <Button variant="primary">Read More</Button>
                    </Card.Body>
                </Card>
            ) : null}
        </div>
    )
}