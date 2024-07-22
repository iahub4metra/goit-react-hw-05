import configuration from "../../js/imageDetailRequest.js"
import getGenres from "../../js/genresRequest.js";
import { Suspense, lazy, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { BackLink } from "../../components/BackLink/BackLink.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import css from "./MovieDetailsPage.module.css"
import clsx from "clsx";

const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'

const MovieRatingStars = lazy(() => import('../../components/MovieRatingStars/MovieRatingStars.jsx'))

const buildLinkClass = ({ isActive }) => {
  return clsx(css.subNavLink, isActive && css.active);
};

const MovieDetailsPage = ({baseUrl}) => {
    const location = useLocation()
    const {movieId} = useParams()
    const [imageUrl, setImageUrl] = useState('')
    const [genres, setGenres] = useState([])
    const { movie, from } = location.state || {};
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    const backLinkHref = query ? `/movies?query=${query}` : from;
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [errorType, setErrorType] = useState(null)

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
            const url = `${baseUrl}${movie.poster_path}`;
            setImageUrl(url);
            renderGenres();
        }
    }, [movie]);

    if (!movie) {
        return <p>loading....</p>;
    }

    return (
        <section className={css.movieDetailsSection}>
            <BackLink to={backLinkHref} children={'Back to home page'} />
            <div className={css.movieDetails}>
                <img className={css.moviePoster} src={movie.poster_path ? imageUrl : defaultImg} alt={`${movie.title} Poster`} />
                <div className={css.movieInfo}>
                    <h2 className={css.movieTitle}>{movie.title}</h2>
                    <div className={css.movieScore}>User score:<MovieRatingStars rating={movie.vote_average} /></div>
                    <h3 className={css.genreTitle}>Genres: {showErrorMsg && <ErrorMessage errorType={errorType} />}
                    {genres.length > 0 && (genres.map((genre, index) => (
                        <span className={css.genre} key={index}>{genre}</span>
                    )))}</h3>
                    
                    <h3 className={css.overviewTitle}>Overview</h3>
                    <p className={css.overviewText}>{movie.overview}</p>
                    <ul className={css.subNav}>
                        <li>
                            <NavLink to="cast" state={{movieId, movie, from}} className={buildLinkClass}>Cast</NavLink>
                        </li>
                        <li>
                            <NavLink to="reviews" state={{movieId, movie, from}} className={buildLinkClass}>Reviews</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            
            <Suspense fallback={<div>Loading subpage...</div>}>
                <Outlet/>
            </Suspense>
        </section>
    );
}
 
export default MovieDetailsPage;


