import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import trendingRequest from "../../js/trendingMoviesRequest.js";
import configuration from "../../js/imageDetailRequest.js"
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'))
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'))
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx'))
const MovieCast = lazy(() => import('../MovieCast/MovieCast.jsx'))
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews.jsx'))
const NotFoundPage = lazy(()=>import('../../pages/NotFoundPage/NotFoundPage.jsx'))

const App = () => {
    const [movies, setMovies] = useState([]);
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [errorType, setErrorType] = useState(null)
    const [baseUrlProfile, setBaseUrlProfile] = useState('')
    const [baseUrl, setBaseUrl] = useState('')
    const getMovies = async () => {
        try {
            const response = await trendingRequest();
            const data = response.data;
            setMovies(data.results);
            
        } catch (error) {
            setShowErrorMsg(true);
            setErrorType('serverError');
        }
    }

    const getBaseUrls = async () => {
        try {
            const data = await configuration()
            setBaseUrlProfile(`${data.images.secure_base_url}${data.images.profile_sizes[1]}`)
            setBaseUrl(`${data.images.secure_base_url}${data.images.poster_sizes[3]}`)
        } catch (error) {
            setShowErrorMsg(true);
            setErrorType('serverError');
        }
    }
    useEffect(() => {
        getMovies()
        getBaseUrls()
    }, [])



    return (
        <>
            <Navigation />
            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route path='/' element={<HomePage movies={movies} errorType={errorType} showErrorMsg={showErrorMsg} baseUrl={baseUrl}/>} />
                    <Route path="/movies" element={<MoviesPage baseUrl={baseUrl} />} />
                    <Route path="/movies/:movieId" element={<MovieDetailsPage baseUrl={baseUrl}/>}>
                        <Route path="cast" element={<MovieCast baseUrlProfile={baseUrlProfile} />} />
                        <Route path="reviews" element={<MovieReviews/>} />
                    </Route>
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </Suspense>
        </>
     );
}
export default App;



