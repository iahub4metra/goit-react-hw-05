import { useOutletContext } from "react-router-dom";
import getReviews from "../../js/movieReviewsRequest";
import { useEffect, useState } from "react";


const MovieReviews = () => {

    const [movieId] = useOutletContext();
    const [reviews, setReviews] = useState([]);
    const addReview = async () => {
        try {
            const data = await getReviews(movieId)
            setReviews(data.results);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        addReview()
    }, [movieId])
    return ( 
        <>  
            <div>
                {reviews == false ? (<p>There are no reviews on this movie yet</p>): (<ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <h3>{review.author}</h3>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>)}
            </div>
        </>
     );
}
 
export default MovieReviews;


