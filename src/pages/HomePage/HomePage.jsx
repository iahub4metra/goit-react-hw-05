import { lazy, Suspense, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import css from "./HomePage.module.css"
const MovieList = lazy(()=>import('../../components/MovieList/MovieList.jsx'))



const HomePage = ({movies, errorType, showErrorMsg}) => {

    return ( 
        <section>  
            <h2 className={css.titleHomePage}>Trending Movies</h2>
            <Suspense fallback={<p>loading...</p>}>
                {showErrorMsg && <ErrorMessage errorType={errorType} />}
                {movies.length > 0 && <MovieList movies={movies} />}
            </Suspense>
        </section>
     );
}
 
export default HomePage;



