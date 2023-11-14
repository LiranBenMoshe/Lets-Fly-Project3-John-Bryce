import { useEffect } from "react";
import pageNotFound from "../../../Assets/Images/page-not-found.png";
import "./PageNotFound.css";

function PageNotFound(): JSX.Element {

    useEffect(() => {
        document.title = "Vacations Website - Error 404";
    }, []);

    return (
        <div className="PageNotFound">
            <img src={pageNotFound} alt="page not found" />
            <p>The page you are looking for doesn't exist.</p>
        </div>
    );
}

export default PageNotFound;