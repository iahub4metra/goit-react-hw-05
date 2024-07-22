import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css"
const MoviesList = ({ movies }) => {
    const location = useLocation()
    return ( 
        <>
            <ul className={css.movieList}>
                {movies.map(movie => (
                    <li key={movie.id} className={css.movieItem}>
                        <Link to={`/movies/${movie.id}`} state={{movie, from: location}} className={css.movieLink}>
                            <img
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'}
                                alt={`${movie.title} Poster`}
                                className={css.moviePoster}
                            />
                            <p className={css.movieTitle}>{movie.title}</p>
                        </Link>
                    </li>
                    )
                )}
            </ul>
        </>
     );
}
 
export default MoviesList;


