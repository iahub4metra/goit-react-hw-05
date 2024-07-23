import { useState, useRef, useEffect } from "react";
import getMovieByName from "../../js/searchMovieRequest";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import MoviePageForm from "../../components/MoviePageForm/MoviePageForm";
import toast, {Toaster} from "react-hot-toast";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";



const notify = () => {
        toast.error('Please fill the field!', {
            position: 'top-right',
            style: {
                backgroundColor:'pink',
            }
    })}

const MoviesPage = ({ baseUrl }) => {
    const [showLoader, setShowLoader] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [moviesByName, setMoviesByName] = useState([])
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [errorType, setErrorType] = useState(null)
    const inputRef = useRef();
    const findMovies = async (movieName) => {
        try {
            setShowLoader(true)
            const response = await getMovieByName(movieName);
            if (response.status === 200) {
                const data = response.data;
                setMoviesByName(data.results);
                const result = data.results;
                setShowErrorMsg(result.length === 0);
                setErrorType(result.length === 0 ? 'noResults' : null);
            } else {
                setShowErrorMsg(true);
                setErrorType('serverError');
            }
        } catch (error) {
            setShowErrorMsg(true);
            setErrorType('serverError');
        } finally {
            setShowLoader(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = inputRef.current.value.trim();
        if (value) {
            setSearchParams({query: value})
            inputRef.current.value = '';
        } else {
            notify()
            return
        }
    }

    useEffect(() => {
        const movieName = searchParams.get('query')
        if (movieName) {
            findMovies(movieName)
        } else {
            setMoviesByName([]);
            setShowErrorMsg(false);
            setErrorType(null);
        }
        
    },[searchParams])




    return ( 
        <>
            <MoviePageForm handleSubmit={handleSubmit} inputRef={inputRef}/>
            {showErrorMsg && <ErrorMessage errorType={errorType} />}
            {showLoader && <Loader/>}
            {moviesByName.length > 0 && <MovieList movies={moviesByName} baseUrl={baseUrl}/>}
            <Toaster/>
        </>
     );
}
 
export default MoviesPage;


