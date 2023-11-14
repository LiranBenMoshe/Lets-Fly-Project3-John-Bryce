import { createStore } from "redux";
import UserModel from "../Models/UserModel";
import jwtDecode from "jwt-decode";

// 1. Global State:
export class AuthState {
    public token: string = null; // JWT.
    public user: UserModel = null; // The user.
    public constructor() {
        // Initialize the state with the token from localStorage, if it exists.
        this.token = localStorage.getItem("token");

        // If a token exists, decode it to extract the user information.
        if (this.token) {
            // Decoding the JWT token and extracting the user information.
            this.user = jwtDecode<{ user: UserModel }>(this.token).user;
        }
    }
}

// 2. Action Type:
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// 3. Action:
export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

// 4. Reducer (invoked by redux library):
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    // Create a new state object based on the current state.
    const newState = { ...currentState };

    // Switch statement to handle different action types.
    switch (action.type) {
        case AuthActionType.Login:
        case AuthActionType.Register:
            // If the action type is Login or Register, update the token and user information.
            newState.token = action.payload;
            
            // Decode the new token to extract user information.
            const decodedToken = jwtDecode<{ user: UserModel }>(newState.token);
            
            // Update the user property in the state with the decoded user information.
            newState.user = decodedToken.user;

            // Store the token in localStorage for persistent login.
            localStorage.setItem("token", newState.token);

            // Store user's role in the Redux store.
            newState.user.roleId = decodedToken.user.roleId;
            break;

        case AuthActionType.Logout:
            // If the action type is Logout, reset the token and user information.
            newState.token = null;
            newState.user = null;

            // Remove the token from localStorage.
            localStorage.removeItem("token");
            break;
    }

    // Return the new state.
    return newState;
}

// 5. Store:
// Create a Redux store using the authReducer.
export const authStore = createStore(authReducer);
