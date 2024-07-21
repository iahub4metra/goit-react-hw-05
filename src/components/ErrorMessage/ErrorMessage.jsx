const ErrorMessage = ({ errorType }) => {
    return (
        <>
            {errorType === 'noResults' && (
                <p>Sorry, there are no movies matching your search query. Please try again!</p>
            )}
            {(errorType === 'serverError' || !errorType) && (
                <p>Something went wrong. Please try to reload the page.</p>
            )}
        </>
    );
}

export default ErrorMessage;

