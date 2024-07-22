import { useLocation, useOutletContext } from "react-router-dom";
import getReviews from "../../js/movieReviewsRequest";
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieReviews.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "./swiperCustom.css"
import { Navigation, Pagination } from 'swiper/modules';

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
            <div className={css.reviewsContainer}>
                {showErrorMsg && <ErrorMessage errorType={errorType} />}
                {reviews.length > 0 &&
                (<Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    className={css.reviewsList}
                >
                {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <li className={css.reviewsItem}>
                                <h3 className={css.reviewsAuthor}>{review.author}</h3>
                                <p className={css.reviewsContent}>{review.content}</p>
                            </li>
                        </SwiperSlide>
                    ))}
                    </Swiper>)
                    }
                {(!reviews.length > 0 && showErrorMsg === false) && (<p>There are no reviews on this movie yet</p>)}
            </div>
     );
}
 
export default MovieReviews;