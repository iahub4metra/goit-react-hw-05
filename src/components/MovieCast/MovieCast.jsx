import { useEffect, useState } from "react";
import getCast from "../../js/movieCastRequest";
import { useLocation, useOutletContext } from "react-router-dom";



const MovieCast = () => {
    const location = useLocation()
    const {movieId} = location.state || {}
    //const [movieId] = useOutletContext()
    const [cast, setCast] = useState([])
    const addCast = async () => {
        try {
            const data = await getCast(movieId)
            setCast(data.cast)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        addCast()
    }, [movieId])




    return ( 
        <>
            <ul>
                {cast.map((actor) => (
                    <li key={actor.id}>
                        <h3>{actor.name}</h3>
                    </li>
                ))}
            </ul>
        </>
     );
}
 
export default MovieCast;
