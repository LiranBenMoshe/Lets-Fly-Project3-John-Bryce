import { useEffect, useState } from 'react';
import RoleModel from '../../../Models/RoleModel';
import { authStore } from '../../../Redux/AuthState';
import AuthMenu from '../../AuthArea/AuthMenu/AuthMenu';
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap CSS
import './Navbar.css'; // Import your custom CSS file

function Navbar() {
    // Use the authStore to check if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(authStore.getState().token !== null);
    const user = authStore.getState().user; // Get user from Redux store
    const isAdmin = user?.roleId === RoleModel.Admin; // Check if the user is an admin

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            // Update the isLoggedIn state based on changes in the Redux store
            const updatedIsLoggedIn = authStore.getState().token !== null;
            setIsLoggedIn(updatedIsLoggedIn);
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        // Render the navigation bar
        <nav className={`navbar navbar-expand-lg navbar-light bg-light ${isLoggedIn ? 'fixed-navbar' : ''}`}>
            <div className="container">
                <a className="navbar-brand" href="/">Lets Fly ✈️</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/vacations">Vacations</a>
                        </li>
                        {isAdmin && isLoggedIn && (
                            <li className="nav-item admin-link">
                                <a className="nav-link" href="/graph">Reports</a>
                            </li>
                        )}
                        {isAdmin && isLoggedIn && (
                            <li className="nav-item admin-link">
                                <a className="nav-link" href="/insert">Add Vacation</a>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="navbar-right">
                    <AuthMenu />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
