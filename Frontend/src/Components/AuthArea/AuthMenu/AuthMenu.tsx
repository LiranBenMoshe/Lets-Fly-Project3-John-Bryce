import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    // State to hold user information
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        // Initialize user from the Redux store
        setUser(authStore.getState().user);

        // Subscribe to changes in the Redux store to update the user information
        const unsubscribe = authStore.subscribe(() => setUser(authStore.getState().user));

        // Unsubscribe when the component unmounts to prevent memory leaks
        return unsubscribe;
    }, []);

    // Function to handle user logout
    function logoutMe(): void {
        authService.logout(); // Log out the user
        notifyService.success("Bye Bye..."); // Display a notification message
    }

    return (
        <div className="AuthMenu">
            {user && (
                <div>
                    <span>Hello {user.firstName} {user.lastName} </span>
                    <NavLink to="/login" onClick={logoutMe}>Logout</NavLink>
                </div>
            )}
        </div>
    );
}

export default AuthMenu;
