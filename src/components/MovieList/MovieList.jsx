import { Link, useLocation } from "react-router-dom";

const MoviesList = ({ movies}) => {
    const location = useLocation()
    return ( 
        <>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`} state={{movies}}>
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


