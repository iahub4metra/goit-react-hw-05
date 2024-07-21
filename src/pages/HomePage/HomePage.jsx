import { lazy, Suspense, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";

const MovieList = lazy(()=>import('../../components/MovieList/MovieList.jsx'))



const HomePage = ({movies, errorType, showErrorMsg}) => {

    return ( 
        <>  
            <h2>Trending Movies</h2>
            <Suspense fallback={<p>loading...</p>}>
                {showErrorMsg && <ErrorMessage errorType={errorType} />}
                {movies.length > 0 && <MovieList movies={movies} />}
            </Suspense>
        </>
     );
}
 
export default HomePage;



