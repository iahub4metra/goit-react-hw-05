import { useLocation, useOutletContext, useParams } from "react-router-dom";
import getReviews from "../../js/movieReviewsRequest";
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieReviews.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "./swiperCustom.css"
import { Navigation, Pagination } from 'swiper/modules';
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";

const MovieReviews = () => {
    const {movieId} = useParams()
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
                (
                <>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        breakpoints={{
                            768: {
                                slidesPerView: 1,
                            },
                            1024: {
                                slidesPerView: 2,
                            }
                        }}
                        navigation={{
                                nextEl: '.custom-swiper-button-next',
                                prevEl: '.custom-swiper-button-prev',
                            }}
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
                    </Swiper>
                    <div className="btns-reviews">
                        <button className="custom-swiper-button custom-swiper-button-prev">
                        <IoArrowBackOutline size={20} />
                    </button>
                    <button className="custom-swiper-button custom-swiper-button-next">
                        <IoArrowForwardOutline size={20} />
                    </button>
                    </div>
                    
                </>
                )
                    }
                {(!reviews.length > 0 && showErrorMsg === false) && (<p>There are no reviews on this movie yet</p>)}
            </div>
     );
}
 
export default MovieReviews;