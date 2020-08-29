import React, { useState, useEffect } from "react";
import {Hero} from './Hero';

export const Home = () =>  {
    const [movies, setMovies] = useState([])
    const [heroImage, setHeroImage] = useState(null)
    useEffect(() => {
        const url = "https://api.themoviedb.org/3/movie/popular?api_key=6ffcd9d2ee08895aa6f5701e5362196b&language=en-US&page=1"
        fetchItems(url);
    },[setMovies, setHeroImage])

    const fetchItems = endpoint => {
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                setMovies([...movies, ...res.results])
                setHeroImage(heroImage || [res.results[0], res.results[1], res.results[2]])
            });
    };

    return (
        <div>
            <Hero heroImage={heroImage} />
            {movies.map((e, k) =>
                <li key={k}>
                    {e.original_title}
                    {e.backdrop_path}
                </li>
            )}
        </div>
    )
}