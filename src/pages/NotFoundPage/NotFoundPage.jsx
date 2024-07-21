import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return ( 
        <div>
            <Link to='/'>Go back to home page</Link>
            <h3>Page was not found!</h3>
        </div>
     );
}
 
export default NotFoundPage;