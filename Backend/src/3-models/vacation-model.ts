import Joi from "joi";
import { ValidationError } from "./client-errors";
import { UploadedFile } from "express-fileupload";

class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: UploadedFile;
    public followersAmount: number;
    public isFollowing: number;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.followersAmount = vacation.followersAmount;
        this.isFollowing = vacation.isFollowing;
    }

    private static validationSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(10).max(450),
        startDate: Joi.date().required(),
        endDate: Joi.date().greater(Joi.ref('startDate')).required(),
        price: Joi.number().required(),
        imageName: Joi.string().optional(),
        image: Joi.object().optional(),
        followersAmount: Joi.optional(),
        isFollowing: Joi.optional()
    });

    public validate(): void {
        const result = VacationModel.validationSchema.validate(this);
        if (result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default VacationModel;