import React, { useState, useEffect } from "react";
import {Hero} from './Hero';
import {SearchBar} from './SearchBar';
import { Button, Spinner } from "react-bootstrap";

export const Home = () =>  {
    const [loading, setLoading] = useState(false)
    const [movies, setMovies] = useState([])
    const [backdrop, setBackdrop] = useState(null)
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [search, setSearch] = useState("")
    
    const fetchItems = endpoint => {
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                setMovies([...movies, ...res.results])
                setBackdrop(backdrop || [res.results[0], res.results[1], res.results[2]])
                setLoading(false)
                setPage(res.page)
                setPages(res.total_pages)
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
            {!search ? <h1>Popular Movies</h1> : <h1>Search Result</h1>}
            {movies && movies.map((e, k) =>
                <li key={k}>
                    {e.original_title}
                    {e.backdrop_path}
                </li>
            )}
            {loading ? <Spinner animation="border" /> : null}
            {page <= pages && !loading ? (
                <div className="p-5">
                    <Button variant="dark" size="lg" block onClick={loadMoreItems}>{loading ? 'Loading…' : 'Click to load more'}</Button>
                </div>
            ) : null}
        </div>
    )
}