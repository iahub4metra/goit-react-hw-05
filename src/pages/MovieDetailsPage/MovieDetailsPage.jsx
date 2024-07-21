import configuration from "../../js/imageDetailRequest.js"
import getGenres from "../../js/genresRequest.js";
import { Suspense, lazy, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { BackLink } from "../../components/BackLink/BackLink.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import css from "./MovieDetailsPage.module.css"

const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'

const MovieRatingStars = lazy(() => import('../../components/MovieRatingStars/MovieRatingStars.jsx'))


const MovieDetailsPage = () => {
    const location = useLocation()
    const {movieId} = useParams()
    const [imageUrl, setImageUrl] = useState('')
    const [genres, setGenres] = useState([])
    const { movie, from } = location.state || {};
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    const [baseUrl, setBaseUrl] = useState('')
    const backLinkHref = query ? `/movies?query=${query}` : from;
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [errorType, setErrorType] = useState(null)
    
    const getImageUrl = async () => {
        try {
            const data = await configuration();
            if (movie && movie.poster_path) {
                setBaseUrl(`${data.images.secure_base_url}${data.images.profile_sizes[1]}`)
                const url = `${data.images.secure_base_url}${data.images.poster_sizes[3]}${movie.poster_path}`;
                setImageUrl(url);
            }
        } catch (error) {
            //setImageUrl(defaultImg)
        }
    }

    const renderGenres = async () => {
        try {
            const data = await getGenres();
            if (movie && movie.genre_ids) {
                const movieGenres = movie.genre_ids.map((id) => {
                    const genre = data.genres.find((g) => g.id === id);
                    return genre ? genre.name : null;
                }).filter((name) => name !== null);
                setGenres(movieGenres);
            }
        } catch (error) {
            setShowErrorMsg(true);
            setErrorType('serverError');
        }
    }

    useEffect(() => {
        if (movie) {
            getImageUrl();
            renderGenres();
        }
    }, [movie]);

    if (!movie) {
        return <p>loading....</p>;
    }

    return (
        <>
            <BackLink to={backLinkHref} children={'Back to home page'} />
            <div className={css.movieDetails}>
                <img className={css.moviePoster} src={movie.poster_path ? imageUrl : defaultImg} alt={`${movie.title} Poster`} />
                <div className={css.movieInfo}>
                    <h2 className={css.movieTitle}>{movie.title}</h2>
                    <div className={css.movieScore}>User score:<MovieRatingStars rating={movie.vote_average} /></div>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <h3>Genres</h3>
                    {showErrorMsg && <ErrorMessage errorType={errorType} />}
                    {genres.length > 0 && (genres.map((genre, index) => (
                        <p className={css.genre} key={index}>{genre}</p>
                    )))}
                    
                </div>
            </div>
            <ul className={css.subNav}>
                <li>
                    <Link to="cast" state={{movieId, movie, from}} className={css.subNavLink}>Cast</Link>
                </li>
                <li>
                    <Link to="reviews" state={{movieId, movie, from}} className={css.subNavLink}>Reviews</Link>
                </li>
            </ul>
            <Suspense fallback={<div>Loading subpage...</div>}>
                <Outlet context={baseUrl}/>
            </Suspense>
        </>
    );
}
 
export default MovieDetailsPage;


