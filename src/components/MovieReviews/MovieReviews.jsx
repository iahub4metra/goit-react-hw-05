import { useLocation, useOutletContext } from "react-router-dom";
import getReviews from "../../js/movieReviewsRequest";
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


const MovieReviews = () => {
    const location = useLocation()
    const { movieId } = location.state || {}
    const [reviews, setReviews] = useState([]);
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [errorType, setErrorType] = useState(null)


    const addReview = async () => {
        try {
            const data = await getReviews(movieId)
            setReviews(data.results);
        } catch (error) {
            setShowErrorMsg(true);
            setErrorType('serverError');
        }
    }

    useEffect(() => {
        addReview()
    }, [movieId])

    return ( 
        <>  
            <div>
                {showErrorMsg && <ErrorMessage errorType={errorType} />}
                {reviews.length > 0 &&
                    (<ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <h3>{review.author}</h3>
                            <p>{review.content}</p>
                        </li>
                    ))}
                    </ul>)
                    }
                {(!reviews.length > 0 && showErrorMsg === false) && (<p>There are no reviews on this movie yet</p>)}
            </div>
        </>
     );
}
 
export default MovieReviews;