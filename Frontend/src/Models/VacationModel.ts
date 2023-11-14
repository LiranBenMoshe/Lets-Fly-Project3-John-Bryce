class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: File;
    public followersAmount: number;
    public isFollowing: number;

    public static destinationValidation = {
        required: { value: true, message: "Destination is required" },
        minLength: { value: 2, message: "Destination must be a minimum of 2 characters" },
        maxLength: { value: 30, message: "Destination cannot exceed 30 characters" }
    };

    public static descriptionValidation = {
        required: { value: true, message: "Description is required" },
        minLength: { value: 10, message: "Description must be a minimum of 10 characters" },
        maxLength: { value: 450, message: "Description cannot exceed 450 characters" }
    };

    public static priceValidation = {
        required: { value: true, message: "Price is required" },
        min: { value: 0, message: "Price cannot be negative" },
        max: { value: 10000, message: "Price cannot exceed 10000" }
    };

    public static imageValidation = {
        required: { value: true, message: "Image is required" },
    };
}

export default VacationModel;
