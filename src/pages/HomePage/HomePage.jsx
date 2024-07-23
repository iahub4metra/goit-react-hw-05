import { lazy, Suspense, useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import css from "./HomePage.module.css"
import Loader from '../../components/Loader/Loader.jsx'
import trendingRequest from "../../js/trendingMoviesRequest.js"
const MovieList = lazy(()=>import('../../components/MovieList/MovieList.jsx'))



const HomePage = ({baseUrl}) => {

    const [movies, setMovies] = useState([]);
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [errorType, setErrorType] = useState(null)
    const [showLoader, setShowLoader] = useState(false)

    const getMovies = async () => {
        try {
            setShowLoader(true)
            const response = await trendingRequest();
            const data = response.data;
            setMovies(data.results);
            
        } catch (error) {
            setShowErrorMsg(true);
            setErrorType('serverError');
        } finally {
            setShowLoader(false)
        }
    }

    useEffect(() => {
        setMovies([])
        getMovies()
    },[] )


    return ( 
        <section>  
            <h2 className={css.titleHomePage}>Trending Movies</h2>
            <Suspense fallback={<p>loading...</p>}>
                {showErrorMsg && <ErrorMessage errorType={errorType} />}
                {showLoader && <Loader/>}
                {movies.length > 0 && <MovieList movies={movies} baseUrl={baseUrl} />}
            </Suspense>
        </section>
     );
}
 
export default HomePage;



