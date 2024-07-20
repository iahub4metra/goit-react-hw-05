import styles from "./MovieRatingStars.module.css"
import clsx from "clsx";
const MovieRatingStars = ({ rating }) => {
    const roundedRating = Math.round(rating * 10) / 10; // Округлення до одного десяткового знака
    const stars = [];

    for (let i = 1; i <= 10; i++) {
        stars.push(
            <span 
                key={i} 
                className={clsx({
                    [styles.filledStar]: i <= roundedRating,
                    [styles.emptyStar]: i > roundedRating
                })}
            >
                ★
            </span>
        );
    }

    return (
        <span className={styles.ratingContainer}>
            {stars}
            <span className={styles.ratingText}>{roundedRating}</span>
        </span>
    );
}
 
export default MovieRatingStars;