import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import configuration from "../../js/imageDetailRequest.js"
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'))
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'))
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx'))
const MovieCast = lazy(() => import('../MovieCast/MovieCast.jsx'))
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews.jsx'))
const NotFoundPage = lazy(()=>import('../../pages/NotFoundPage/NotFoundPage.jsx'))

const App = () => {
    // const [showErrorMsg, setShowErrorMsg] = useState(false)
    // const [errorType, setErrorType] = useState(null)
    const [baseUrlProfile, setBaseUrlProfile] = useState('')
    const [baseUrl, setBaseUrl] = useState('')
    
    const getBaseUrls = async () => {
        try {
            const data = await configuration()
            setBaseUrlProfile(`${data.images.secure_base_url}${data.images.profile_sizes[1]}`)
            setBaseUrl(`${data.images.secure_base_url}${data.images.poster_sizes[3]}`)
        } catch (error) {
            // setShowErrorMsg(true);
            // setErrorType('serverError');
        }
    }
    useEffect(() => {
        getBaseUrls()
    }, [])



    return (
        <>
            <Navigation />
            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route path='/' element={<HomePage baseUrl={baseUrl}/>} />
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



