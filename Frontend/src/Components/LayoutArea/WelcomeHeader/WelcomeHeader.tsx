import { NavLink, useNavigate } from "react-router-dom";
import "./WelcomeHeader.css"; // Import the CSS file

function WelcomeHeader() {
    return (
        <div className="WelcomeHeader">
            <h2>Welcome to Lets Fly !</h2>
            <h5>Discover the best vacations at the best prices</h5>
        </div>
    );
}

export default WelcomeHeader;
