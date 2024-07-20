import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import trendingRequest from "../../js/trendingMoviesRequest.js";
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'))
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'))
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx'))
const MovieCast = lazy(() => import('../MovieCast/MovieCast.jsx'))
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews.jsx'))
//const NotFoundPage = lazy(()=>import('../../pages/NotFoundPage/NotFoundPage.jsx'))

const App = () => {
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
        try {
            const data = await trendingRequest()
            setMovies(data.results)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMovies()
    }, [])



    return (
        <>
            <Navigation />
            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route path='/' element={<HomePage movies={movies}/>} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:movieId" element={<MovieDetailsPage movies={movies}/>}>
                        <Route path="cast" element={<MovieCast/>} />
                        <Route path="reviews" element={<MovieReviews/>} />
                    </Route>
                    
                </Routes>
            </Suspense>
        </>
     );
}
export default App;



