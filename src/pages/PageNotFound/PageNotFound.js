import './PageNotFound.scss';
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <section className="page-not-found">
            <h1 className="page-title">Page Not Found</h1>
            <button className="secondary-button page-not-found__button" onClick={() => navigate(-1)}>Return</button>
        </section>
    );
}

export default PageNotFound;