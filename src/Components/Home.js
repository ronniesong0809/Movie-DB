import React, { useState, useEffect } from "react";
import {Hero} from './Hero';
import {SearchBar} from './SearchBar';
import {Movie} from './Movie'
import { Button, Spinner, CardDeck } from "react-bootstrap";

export const Home = () =>  {
    const [loading, setLoading] = useState(false)
    const [movies, setMovies] = useState([])
    const [backdrop, setBackdrop] = useState(null)
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [search, setSearch] = useState("")
    const [notFound, setNotFound] = useState(false)

    const fetchItems = endpoint => {
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                if(!res || !res.results || res.results.length===0){
                    setNotFound(true)
                }else{
                    setMovies([...movies, ...res.results])
                    setBackdrop(backdrop || [res.results[0], res.results[1], res.results[2]])
                    setLoading(false)
                    setPage(res.page)
                    setPages(res.total_pages)
                    setNotFound(false)
                }
            });
    };
    
    useEffect(() => {
        setLoading(true)
        
        let url = "";
        if (search===""){
            url = "https://api.themoviedb.org/3/movie/popular?api_key=6ffcd9d2ee08895aa6f5701e5362196b&language=en-US&page=1";
        }else{
            url = `https://api.themoviedb.org/3/search/movie?api_key=6ffcd9d2ee08895aa6f5701e5362196b&language=en-US&query=${search}`;
        }
        console.log(url)
        fetchItems(url);
    },[search])

    

    const searchMovies = searchTerm => {
        setMovies([])
        setSearch(searchTerm)
    };

    const loadMoreItems = () => {
        setLoading(true)
    
        let url = "";
        if (search === "") {
            url = `https://api.themoviedb.org/3/movie/popular?api_key=6ffcd9d2ee08895aa6f5701e5362196b&language=en-US&page=${page + 1}`;
        } else {
            url = `https://api.themoviedb.org/3/search/movie?api_key=6ffcd9d2ee08895aa6f5701e5362196b&language=en-US&query=${search}&page=${page + 1}`;
        }
        console.log(url)
        fetchItems(url);
      };

    return (
        <div>
            <Hero heroImage={backdrop} />
            <SearchBar callback={searchMovies}/>
            {!notFound ? (
                !search ? <h1 className="textShadow whiteText">Popular Movies</h1> : <h1 className="textShadow whiteText">Search Result</h1>
            ) : <h1 className="textShadow whiteText">Not Found</h1>}

            <div className="cardDeck" bsPrefix>
                {movies && movies.map((e, k) =>
                    <Movie key={k} Movie={e}/>
                )}
            </div>
            {loading ? (
                <span className="justify-content-center spinner svgShadow my-5">
                    <Spinner className="mx-2" animation="border" />
                    <Spinner className="mx-2" animation="border" />
                    <Spinner className="mx-2" animation="border" />
                    <Spinner className="mx-2" animation="border" />
                    <Spinner className="mx-2" animation="border" />
                </span>
            ) : null}
            {page <= pages && !loading ? (
                <div className="p-5 svgShadow">
                    <Button variant="light" size="lg" block onClick={loadMoreItems}>{loading ? 'Loading…' : 'Click to load more'}</Button>
                </div>
            ) : null}
        </div>
    )
}