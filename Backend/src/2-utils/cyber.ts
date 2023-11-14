import { ForbiddenError, UnauthorizedError } from "../3-models/error-models";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";
import jwt from "jsonwebtoken";

// Token secret key:
const tokenSecretKey = "I-Need-Vacation";

// Create JWT token:
function getNewToken(user: UserModel): string {

    // Container for user object inside the token:
    const container = { user };

    // Expiration:
    const options = { expiresIn: "3h" };

    // Create token:
    const token = jwt.sign(container, tokenSecretKey, options);

    // Return token:
    return token;
}

// Verify legal token:
function verifyLoggedIn(token: string): void {

    if (!token) throw new UnauthorizedError("You are not logged in.");

    try {
        jwt.verify(token, tokenSecretKey);
    }
    catch (err: any) {
        throw new UnauthorizedError(err.message);
    }

}

// Verify admin role:
function verifyAdmin(token: string): void {

    // Verify legal token:
    verifyLoggedIn(token);

    // Get container: 
    const container = jwt.verify(token, tokenSecretKey) as { user: UserModel };

    // Extract user: 
    const user = container.user;

    // If not admin:
    if(user.roleId !== RoleModel.Admin) throw new ForbiddenError("You are not an admin.");
}

export default {
    getNewToken,
    verifyLoggedIn,
    verifyAdmin
};
