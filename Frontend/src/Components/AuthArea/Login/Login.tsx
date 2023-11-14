import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {
    // Initialize the form using react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();
    
    // Use the navigate function for programmatic navigation
    const navigate = useNavigate();

    // Function to handle the form submission
    async function send(credentials: CredentialsModel) {
        try {
            // Call the login service to log in the user
            await authService.login(credentials);

            // Display a success notification
            notifyService.success("You have been successfully logged-in.");

            // Navigate to the "/vacations" page
            navigate("/home");
        } catch (err: any) {
            // Display an error notification if login fails
            notifyService.error(err);
        }
    }

    useEffect(() => {
        // Set the document title
        document.title = "Lets Fly - Login";
    }, []);

    return (
        <div className="Login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(send)}>
                {/* Email input */}
                <div className="input">
                    <label>Email: </label>
                    <span className="error-message">{errors.email?.message}</span>
                    <input type="text" {...register("email", CredentialsModel.emailValidation)} />
                </div>

                {/* Password input */}
                <div className="input">
                    <label>Password: </label>
                    <span className="error-message">{errors.password?.message}</span>
                    <input type="password" {...register("password", CredentialsModel.passwordValidation)} />
                </div>

                {/* Login button */}
                <button>Login</button>

                {/* Link to registration page */}
                <span className="register">Don't have an account?&nbsp;<NavLink to="/register">Register</NavLink></span>
            </form>
        </div>
    );
}

export default Login;
