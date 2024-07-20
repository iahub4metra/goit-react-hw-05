import configuration from "../../js/imageDetailRequest.js"
import getGenres from "../../js/genresRequest.js";
import { Suspense, lazy, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { BackLink } from "../../components/BackLink/BackLink.jsx";



const MovieRatingStars = lazy(() => import('../../components/MovieRatingStars/MovieRatingStars.jsx'))




const MovieDetailsPage = ({ movies }) => {

    // const getMovieById = (movieId) => {
    //     return movies.find((movie)=> movie.id.toString() === movieId)
    // }
    const location = useLocation()
    const { movieId } = useParams()
    //const movie = getMovieById(movieId, moviesFromState || movies);
    const moviesFromState = location.state?.movies
    const [imageUrl, setImageUrl] = useState('')
    const [genres, setGenres] = useState([])
    
    const getMovieById = (movieId, movies) => {
        return movies.find((movie) => movie.id.toString() === movieId);
    }

    const movie = getMovieById(movieId, moviesFromState);


    const backLinkHref = location.state ?? '/';
    const getImageUrl = async () => {
        try {
            const data = await configuration();
            if (movie && movie.poster_path) {
                const url = `${data.images.secure_base_url}${data.images.poster_sizes[3]}${movie.poster_path}`;
                setImageUrl(url);
            }
        } catch (error) {
            console.error('Failed to fetch image configuration', error);
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
                console.error('Failed to fetch genres', error);
            }
    }

    useEffect(() => {
        getImageUrl();
        renderGenres()
    }, [movie]);

    return ( 
        <>  
            <BackLink to={backLinkHref} children={'Back to home page'}/>
            <div>
                {imageUrl ? (
                    <img src={imageUrl} alt={movie.title || "Movie Poster"} />) : ( <p>Loading...</p>)}
                <div>
                    <h2>{movie.title}</h2>
                    <div>User score:<MovieRatingStars rating={movie.vote_average} /></div>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <h3>Genres</h3>
                    {genres.map((genre, index) => (
                        <p key={index}>{genre}</p>
                    ))}
                </div>
            </div>
            <ul>
                <li>
                    <Link to="cast">
                        Cast
                    </Link>
                </li>
                <li>
                    <Link to="reviews">
                        Reviews
                    </Link>
                </li>
            </ul>
            <Suspense fallback={<div>Loading subpage...</div>}>
                <Outlet context={[movieId]}/>
            </Suspense>
            
        </>
     );
}
 
export default MovieDetailsPage;


