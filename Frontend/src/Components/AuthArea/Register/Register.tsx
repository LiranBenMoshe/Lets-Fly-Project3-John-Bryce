import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {
    // Initialize the form using react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();

    // Use the navigate function for programmatic navigation
    const navigate = useNavigate();

    // Function to handle the form submission for user registration
    async function send(user: UserModel) {
        try {
            // Call the registration service to register the user
            await authService.register(user);

            // Display a success notification
            notifyService.success("You have been successfully registered.");

            // Navigate to the "/vacations" page after successful registration
            navigate("/home");
        } catch (err: any) {
            // Display an error notification if registration fails
            notifyService.error(err);
        }
    }

    useEffect(() => {
        // Set the document title
        document.title = "Lets Fly - Register";
    }, []);

    return (
        <div className="Register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(send)}>
                {/* First Name input */}
                <div className="input">
                    <label>First Name: </label>
                    <span className="error-message">{errors.firstName?.message}</span>
                    <input type="text" {...register("firstName", UserModel.firstNameValidation)} />
                </div>

                {/* Last Name input */}
                <div className="input">
                    <label>Last Name: </label>
                    <span className="error-message" >{errors.lastName?.message}</span>
                    <input type="text" {...register("lastName", UserModel.lastNameValidation)} />
                </div>

                {/* Email input */}
                <div className="input">
                    <label>Email: </label>
                    <span className="error-message">{errors.email?.message}</span>
                    <input type="text" {...register("email", UserModel.emailValidation)} />
                </div>

                {/* Password input */}
                <div className="input">
                    <label>Password: </label>
                    <span className="error-message">{errors.password?.message}</span>
                    <input type="password" {...register("password", UserModel.passwordValidation)} />
                </div>

                {/* Register button */}
                <button>Register</button>

                {/* Link to the login page */}
                <span className="login">Already have an account?&nbsp; <NavLink to="/login">Login</NavLink></span>
            </form>
        </div>
    );
}

export default Register;
