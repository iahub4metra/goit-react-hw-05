import css from "./MoviePageForm.module.css"
import { IoSearchOutline } from "react-icons/io5";
const MoviePageForm = ({ handleSubmit, inputRef }) => {
    return ( 
        <div className={css.formContainer}>
            <form className={css.movieForm} onSubmit={handleSubmit}>
                <input className={css.formInput} type="text" autoComplete="off" name="movieNameInput" ref={inputRef} placeholder="Search"/>
                <button className={css.formButton} type="submit"><IoSearchOutline className={css.submitIcon} /></button>
            </form>
        </div>
     );
}
 
export default MoviePageForm;