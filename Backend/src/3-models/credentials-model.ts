import Joi from "joi";
import { ValidationError } from "./error-models";

class CredentialsModel {

    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    // Validation schema - build once:
    private static validationSchema = Joi.object({
        email: Joi.string().required().min(10).max(50),
        password: Joi.string().required().min(4).max(50)
    });

    // Validate properties and throw if not valid:
    public validate(): void {
        const result = CredentialsModel.validationSchema.validate(this);
        if (result.error?.message) throw new ValidationError(result.error.message);
    }

}

export default CredentialsModel;
