import { OkPacket } from "mysql";
import UserModel from "../3-models/user-model";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { UnauthorizedError, ValidationError } from "../3-models/error-models";
import CredentialsModel from "../3-models/credentials-model";
import RoleModel from "../3-models/role-model";
import bcrypt from "bcrypt";

// Register a new user:
async function register(user: UserModel): Promise<string> {
    // Validation:
    user.validate();

    // Set "User" as role:
    user.roleId = RoleModel.User;

    // Is username taken:
    if (await isEmailTaken(user.email)) throw new ValidationError(`Email ${user.email} already taken.`);

    // Hash the password before saving to the database
    await user.hashPassword();

    // SQL:
    const sql = `INSERT INTO users(firstName, lastName, email, password, roleId)
                VALUES('${user.firstName}',
                       '${user.lastName}',
                       '${user.email}',
                       '${user.password}',
                       ${user.roleId})`;

    // Execute:
    const info: OkPacket = await dal.execute(sql);

    // Set back new id:
    user.userId = info.insertId;

    // Get new token:
    const token = cyber.getNewToken(user);

    // Return token:
    return token;
}

// Login:
async function login(credentials: CredentialsModel): Promise<string> {
    // Validation:
    credentials.validate();

    // SQL:
    const sql = `SELECT * FROM users WHERE 
                 email = '${credentials.email}'`;

    // Execute:
    const users = await dal.execute(sql);

    // Extract user:
    const user = users[0];

    // If no such user or incorrect password:
    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
        throw new UnauthorizedError("Incorrect email or password.");
    }

    // Generate JWT:
    const token = cyber.getNewToken(user);

    // Return token:
    return token;
}

async function isEmailTaken(email: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) AS count FROM users WHERE email = '${email}'`;
    const result = await dal.execute(sql);
    const count = result[0].count;
    return count > 0;
}

export default {
    register,
    login
}
