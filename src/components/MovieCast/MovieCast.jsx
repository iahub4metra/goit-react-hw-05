import { useEffect, useState } from "react";
import getCast from "../../js/movieCastRequest";
import { useLocation } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "./swiperCustomCast.css"
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'

const MovieCast = ({baseUrlProfile}) => {
    const location = useLocation()
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
            {cast &&
                <>
                <Swiper
                    className={css.castList}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    navigation={{
                                nextEl: '.custom-swiper-button-next',
                                prevEl: '.custom-swiper-button-prev',
                            }}
                >
                        {cast.map((actor) => (
                        <SwiperSlide key={actor.id}>
                            <li className={css.castItem}>
                                <img className={css.actorImage} src={actor.profile_path ? `${baseUrlProfile}${actor.profile_path}` : defaultImg} alt={actor.name} width={185}/>
                                <h3 className={css.actorName}>{actor.name}</h3>
                                <p className={css.actorCharacter}>{actor.character}</p>
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
                
            }
            
        </>
     );
}
 
export default MovieCast;
