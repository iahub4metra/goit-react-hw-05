import { useEffect, useState } from "react";
import getCast from "../../js/movieCastRequest";
import { useLocation, useOutletContext } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'

const MovieCast = () => {
    const location = useLocation()
    const baseUrl = useOutletContext()
    const {movieId} = location.state || {}
    const [cast, setCast] = useState([])
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [errorType, setErrorType] = useState(null)

    const addCast = async () => {
        try {
            const data = await getCast(movieId)
            setCast(data.cast)
        } catch (error) {
            setShowErrorMsg(true);
            setErrorType('serverError')
        }
    }

    useEffect(() => {
        addCast()
    }, [movieId])




    return ( 
        <>  
            {showErrorMsg && <ErrorMessage errorType={errorType} />}
            {cast && <ul>
                {cast.map((actor) => (
                    <li key={actor.id}>
                        <img src={actor.profile_path ? `${baseUrl}${actor.profile_path}` : defaultImg} alt={actor.name} width={185} height={278}/>
                        <h3>{actor.name}</h3>
                        <p>{actor.character}</p>
                    </li>
                ))}
            </ul>}
            
        </>
     );
}
 
export default MovieCast;
