import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import Navbar from "../Navbar/Navbar";
import WelcomeHeader from "../WelcomeHeader/WelcomeHeader";
import "./Header.css"; // Import the CSS file

function Header() {
    // Define state to manage user login status
    const [isLoggedIn, setIsLoggedIn] = useState(authStore.getState().token !== null);

    // Subscribe to changes in the login status using useEffect
    useEffect(() => {
        // Subscribe to changes in login status and update isLoggedIn
        const unsubscribe = authStore.subscribe(() => {
            setIsLoggedIn(authStore.getState().token !== null);
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <div className="Header">
            {isLoggedIn ? <Navbar /> : <WelcomeHeader />}
        </div>
    );
}

export default Header;
