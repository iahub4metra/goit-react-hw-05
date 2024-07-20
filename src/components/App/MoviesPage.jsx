import { useState, useRef, useEffect } from "react";
import getMovieByName from "../../js/searchMovieRequest";
import MoviesList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";


const MoviesPage = ({ }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [moviesByName, setMoviesByName] = useState([])
    const inputRef = useRef();
    const findMovies = async (movieName) => {
        try {
            const data = await getMovieByName(movieName);
            setMoviesByName(data.results)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = inputRef.current.value.trim();
        if (value) {
            setSearchParams({query: value})
            inputRef.current.value = '';
        }
    }

    useEffect(() => {
        const movieName = searchParams.get('query')
        if (movieName) {
            findMovies(movieName)
        }
        
    },[searchParams])




    return ( 
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" autoComplete="off" name="movieNameInput" ref={inputRef}/>
                <button type="submit">Search</button>
            </form>
            <MoviesList movies={moviesByName}/>
        </>
     );
}
 
export default MoviesPage;


