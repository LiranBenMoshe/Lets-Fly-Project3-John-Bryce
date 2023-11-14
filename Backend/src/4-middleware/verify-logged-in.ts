import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

// Verify token validity:
function verifyLoggedIn(request: Request, response: Response, next: NextFunction): void {

    // Authorization: "Bearer the-token"
    //                 01234567890...
    const authorizationHeader = request.header("authorization");

    // Extract the token:
    const token = authorizationHeader?.substring(7);

    // Verify token:
    cyber.verifyLoggedIn(token);

    // Continue to next middleware/route:
    next();
}

export default verifyLoggedIn;
