import bcrypt from "bcrypt";
import Joi from "joi";
import { ValidationError } from "./client-errors";
import RoleModel from "./role-model";

class UserModel {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    private static registerValidationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        email: Joi.string().required(),
        password: Joi.string().required().min(4).max(50),
        roleId: Joi.number().optional(),
    });

    public validate(): void {
        const result = UserModel.registerValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    public async comparePassword(inputPassword: string): Promise<boolean> {
        return bcrypt.compare(inputPassword, this.password);
    }
}

export default UserModel;
