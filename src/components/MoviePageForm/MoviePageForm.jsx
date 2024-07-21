const MoviePageForm = ({handleSubmit, inputRef}) => {
    return ( 
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" autoComplete="off" name="movieNameInput" ref={inputRef}/>
                <button type="submit">Search</button>
            </form>
        </>
     );
}
 
export default MoviePageForm;