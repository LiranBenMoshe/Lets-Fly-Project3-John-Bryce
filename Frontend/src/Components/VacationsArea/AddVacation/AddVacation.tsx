import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import dataService from "../../../Services/VacationService";
import "./AddVacation.css";

function AddVacation(): JSX.Element {
    // React Hook Form setup
    // Navigation handling
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<VacationModel>();


    // State to manage selected start date
    const [startDateSelected, setStartDateSelected] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [chosenImage, setChosenImage] = useState<File | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    // Get the current date in Israel
    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() + 2);

    // Convert the modified date to ISO string
    const today = currentDateTime.toISOString().split("T")[0];

    // Function to handle the change of the start date input
    const handleStartDateChange = (newStartDate: string) => {
        setStartDate(newStartDate);
        setStartDateSelected(true);
        setEndDate("");
    };

    // Function to handle the change of the end date input
    const handleEndDateChange = (newEndDate: string) => {
        setEndDate(newEndDate);
    };

    // Function to set the min attribute for the end date input
    const setEndDateMin = () => {
        if (startDate) {
            const minDate = new Date(startDate);
            minDate.setDate(minDate.getDate() + 1); // Add one day to the startDate
            return minDate.toISOString().split("T")[0];
        }
        return today;
    };

    // Function to handle form submission
    async function send(vacation: VacationModel) {
        try {
            if (chosenImage) {
                vacation.image = chosenImage;
            }
            await dataService.addVacation(vacation);
            notifyService.success("Vacation has been added successfully.");
            navigate("/vacations");
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    // Function to open the file input dialog
    const handleImageChange = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    // Function to handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setChosenImage(selectedImage);

            // Use setValue to update the "image" field in react-hook-form
            setValue("image", selectedImage);
        }
    };


    // useEffect to set the document title
    useEffect(() => {
        document.title = "Lets Fly - Add Vacation";
    }, []);

    return (
        <div className="AddVacation">
            <h2>Add Vacation</h2>
            <form onSubmit={handleSubmit(send)}>
                <div className="input-group">
                    <div className="input">
                        <label>Destination: </label>
                        <span className="error-message">{errors.destination?.message}</span>
                        <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                    </div>
                    <div className="input">
                        <label>Start Date: </label>
                        <span className="error-message">{errors.startDate?.message}</span>
                        <input
                            type="date"
                            {...register("startDate", { required: "Start Date is required" })}
                            min={today}
                            value={startDate}
                            onChange={(e) => handleStartDateChange(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label>End Date: </label>
                        <span className="error-message">{errors.endDate?.message}</span>
                        <input
                            type="date"
                            {...register("endDate", {
                                required: "End Date is required",
                                validate: (value) => {
                                    if (startDateSelected) {
                                        const newStartDate = new Date(startDate);
                                        const newEndDate = new Date(value);
                                        return newEndDate > newStartDate;
                                    }
                                    return true;
                                },
                            })}
                            min={setEndDateMin()}
                            value={endDate}
                            onChange={(e) => handleEndDateChange(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label>Description: </label>
                        <span className="error-message">{errors.description?.message}</span>
                        <textarea {...register("description", VacationModel.descriptionValidation)} />
                    </div>
                    <div className="input">
                        <label>Price: </label>
                        <span className="error-message">{errors.price?.message}</span>
                        <input type="number" {...register("price", VacationModel.priceValidation)} />
                    </div>
                </div>
                <div className="image-input">
                    <label>Image: </label>
                    <div className="image-input-container">
                        <span className="error-message">{errors.image?.message}</span>
                        {chosenImage ? (
                            <div className="selected-image-container">
                                <span className="image-input-text"> Click to Change Image 🔽</span>
                                <img
                                    onClick={handleImageChange}
                                    src={URL.createObjectURL(chosenImage)}
                                    alt="Selected Image"
                                    className="selected-image"
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                        ) : (
                            <label
                                className="custom-image-input"
                                onClick={handleImageChange}
                                style={{ cursor: "pointer" }}
                            >
                                Select An Image
                            </label>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", VacationModel.imageValidation)}
                            ref={imageInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileSelect}
                        />
                    </div>
                </div>
                <br />
                <button>Add Vacation</button>
            </form>
        </div>
    );
}

export default AddVacation;
