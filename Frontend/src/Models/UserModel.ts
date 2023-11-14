import RoleModel from "./RoleModel";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel

    // Validation:
    public static firstNameValidation = {
        required: { value: true, message: "Missing first name" },
        minLength: { value: 2, message: "First name must be minimum 2 chars" },
        maxLength: { value: 20, message: "First name cannot exceeds 20 chars" }
    };

    public static lastNameValidation = {
        required: { value: true, message: "Missing last name" },
        minLength: { value: 2, message: "Last name must be minimum 2 chars" },
        maxLength: { value: 20, message: "Last name cannot exceeds 20 chars" }
    };

    public static emailValidation = {
        required: { value: true, message: "Missing email" },
        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Please enter a valid email address." }
    };
    

    public static passwordValidation = {
        required: { value: true, message: "Missing Password" },
        minLength: { value: 4, message: "Password must be minimum 4 chars" },
        maxLength: { value: 50, message: "Password cannot exceeds 50 chars" }
    }
}

export default UserModel;
