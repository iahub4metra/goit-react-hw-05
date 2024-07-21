import css from "./ErrorMessage.module.css"
const ErrorMessage = ({ errorType }) => {
    return (
        <>
            {errorType === 'noResults' && (
                <p className={css.errorMessage}>Sorry, there are no movies matching your search query. Please try again!</p>
            )}
            {(errorType === 'serverError' || !errorType) && (
                <p className={css.errorMessage}>Something went wrong. Please try to reload the page.</p>
            )}
        </>
    );
}

export default ErrorMessage;

