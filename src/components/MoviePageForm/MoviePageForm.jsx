import css from "./MoviePageForm.module.css"
const MoviePageForm = ({ handleSubmit, inputRef }) => {
    return ( 
        <div className={css.formContainer}>
            <form className={css.movieForm} onSubmit={handleSubmit}>
                <input className={css.formInput} type="text" autoComplete="off" name="movieNameInput" ref={inputRef}/>
                <button className={css.formButton} type="submit">Search</button>
            </form>
        </div>
     );
}
 
export default MoviePageForm;