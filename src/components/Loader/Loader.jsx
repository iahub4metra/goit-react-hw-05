import { ProgressBar } from 'react-loader-spinner'
import css from "./Loader.module.css"
const Loader = () => {
    return ( 
        <>
            <ProgressBar
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass={css.loader}
                borderColor='#C9C1B1'
                barColor='#BBAF97'
            />
        </>
     );
}
 
export default Loader
