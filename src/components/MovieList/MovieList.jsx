import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css"
const MoviesList = ({ movies }) => {
    const location = useLocation()
    return ( 
        <>
            <ul className={css.moviesList}>
                {movies.map(movie => (
                    <li key={movie.id} className={css.movieItem}>
                        <Link to={`/movies/${movie.id}`} state={{movie, from: location}} className={css.movieLink}>
                            <p>{movie.title}</p>
                        </Link>
                    </li>
                    )
                )}
            </ul>
        </>
     );
}
 
export default MoviesList;


