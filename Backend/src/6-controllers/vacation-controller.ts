import express, { NextFunction, Request, Response } from "express";
import path from "path";
import StatusCode from "../3-models/status-code";
import VacationModel from "../3-models/vacation-model";
import verifyAdmin from "../4-middleware/verify-admin";
import verifyLoggedIn from "../4-middleware/verify-logged-in";
import vacationService from "../5-services/vacation-service";

const router = express.Router();

// GET http://localhost:4000/api/vacations/:userId Get all vacations
router.get("/vacations/:userId" , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = parseInt(request.params.userId); // Extract the userId from the URL parameter

        // Call the service function with the userId.
        const vacations = await vacationService.getAllVacations(userId);

        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});


// GET http://localhost:4000/api/vacation-by-id/:vacationId  // Get one vacation
router.get("/vacation-by-id/:vacationId", verifyLoggedIn,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await vacationService.getOneVacation(vacationId);
        response.json(vacation);
    }
    catch (err: any) { next(err); }
});

// GET http://localhost:4000/api/users  // Get all users
router.get("/users", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await vacationService.getAllUsers();
        response.json(users);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/user-by-id/:userId  // Get one user
router.get("/user-by-id/:userId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const user = await vacationService.getOneUser(userId);
        response.json(user);
    }
    catch (err: any) { next(err); }
});

// POST http://localhost:4000/api/vacations // Add new vacation(Admin)
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Add image from request.files into request.body:
        request.body.image = request.files?.image;

        // Get vacation send from frontend:
        const vacation = new VacationModel(request.body);

        // Response back to database:
        const addedVacation = await vacationService.addVacation(vacation);
        response.status(StatusCode.Created).json(addedVacation);
    }
    catch (err: any) { next(err); }
});

// PUT http://localhost:4000/api/vacations/:vacationId Update Vacation(Admin)
router.put("/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.vacationId;

        // Add image from request.files into request.body:
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);

        const updatedVacation = await vacationService.updateVacation(vacation);

        response.status(200).json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4000/api/following/:vacationId/:userId Follow
router.post("/following/:vacationId([0-9]+)/:userId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const userId = +request.params.userId;
        await vacationService.follow(vacationId, userId);
        response.sendStatus(201);
    } catch (err: any) {
        next(err);
    }
});


// DELETE http://localhost:4000/api/following/:userId/:vacationId Unfollow
router.delete("/following/:userId([0-9]+)/:vacationId([0-9]+)", verifyLoggedIn,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const userId = +request.params.userId;
        await vacationService.unfollow(userId, vacationId);
        response.sendStatus(201);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:4000/api/vacations/:vacationId Delete Vacation(Admin)
router.delete("/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await vacationService.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/image-by-name/:imageName  // Get image by id
router.get("/image-by-name/:imageName",  async (request: Request, response: Response, next: NextFunction) => {

    try {

        // Get image name:
        const imageName = request.params.imageName;

        // Get image absolute path:
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);

        // Response back image file:
        response.sendFile(absolutePath);
    }

    catch (err: any) {
        next(err)
    }

});

export default router;
