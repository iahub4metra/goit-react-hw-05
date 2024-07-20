import { lazy, Suspense, useEffect } from "react";

const MovieList = lazy(()=>import('../../components/MovieList/MovieList.jsx'))



const HomePage = ({movies}) => {

    return ( 
        <>
            <Suspense fallback={<p>loading...</p>}>
                <MovieList movies={movies}/>
            </Suspense>
        </>
     );
}
 
export default HomePage;



