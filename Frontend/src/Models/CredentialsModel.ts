class CredentialsModel { // Credentials - The needed properties for entering somewhere.    
    public email: string;
    public password: string;
    
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


export default CredentialsModel;
