import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import dataService from "../../../Services/VacationService";
import appConfig from "../../../Utils/AppConfig";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    // State variables for managing the component's data
    const [vacation, setVacation] = useState<VacationModel>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();
    const vacationId = +params.prodId;

    // State variables for date selection and image handling
    const [startDateSelected, setStartDateSelected] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [chosenImage, setChosenImage] = useState<File | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    // Handle changing the start date
    const handleStartDateChange = (newStartDate: string) => {
        setStartDate(newStartDate);
        setStartDateSelected(true);
        setEndDate("");
    };

    // Handle changing the end date
    const handleEndDateChange = (newEndDate: string) => {
        setEndDate(newEndDate);
    };

    // Calculate the minimum end date based on the selected start date
    const setEndDateMin = () => {
        if (startDate) {
            const minDate = new Date(startDate);
            minDate.setDate(minDate.getDate() + 1);
            return minDate.toISOString().split("T")[0];
        }
    };

    // Handle image input click
    const handleImageChange = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    // Handle file selection for the image input
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setChosenImage(e.target.files[0]);
            handleImageChange();
        }
    };

    // Handle form submission
    const send = async (vacation: VacationModel) => {
        try {
            vacation.vacationId = vacationId;
            if (chosenImage) {
                vacation.image = chosenImage;
            }
            await dataService.editVacation(vacation);
            notifyService.success("Vacation has been Edited successfully.");
            navigate("/vacations");
        } catch (err) {
            notifyService.error(err);
        }
    };

    // Fetch the vacation data on component load
    useEffect(() => {
        dataService.getOneVacation(vacationId)
            .then((backendVacation) => {
                setVacation(backendVacation);
                setStartDate(backendVacation.startDate);
                setValue("destination", backendVacation.destination);
                setValue("description", backendVacation.description);
                setValue("startDate", backendVacation.startDate);
                setValue("endDate", backendVacation.endDate);
                setValue("price", backendVacation.price);
                setEndDate(backendVacation.endDate);
            })
            .catch((err) => notifyService.error(err));
    }, []);

    // Set the document title
    useEffect(() => {
        document.title = "Lets Fly - Edit Vacation";
    }, []);

    return (
        <div className="EditVacation">

            <h2>Edit Vacation</h2>

            <form onSubmit={handleSubmit(send)}>
                <div className="input-group">
                    <div className="input">
                        <label>Destination: </label>
                        <span className="error-message">{errors.destination?.message}</span>
                        <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                    </div>
                    <div className="input">
                        <label>Price: </label>
                        <span className="error-message">{errors.price?.message}</span>
                        <input type="number" {...register("price", VacationModel.priceValidation)} />
                    </div>
                </div>
                <div className="input">
                    <label>Description: </label>
                    <span className="error-message">{errors.description?.message}</span>
                    <textarea {...register("description", VacationModel.descriptionValidation)} />
                </div>
                <div className="input-group">
                    <div className="input">
                        <label>Start Date: </label>
                        <span className="error-message">{errors.startDate?.message}</span>
                        <input
                            type="date"
                            {...register("startDate", {
                                required: "Start Date is required",
                            })}
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
                                        return newEndDate >= newStartDate;
                                    }
                                    return true;
                                },
                            })}
                            min={setEndDateMin()}
                            value={endDate}
                            onChange={(e) => handleEndDateChange(e.target.value)}
                        />
                    </div>
                </div>
                <div className="input">
                    <label>Image: </label>
                    <div className="image-input-container">
                        <span>Click to Change Image 🔽</span>
                        <img
                            onClick={handleImageChange}
                            src={chosenImage ? URL.createObjectURL(chosenImage) : appConfig.vacationImageUrl + vacation?.imageName}
                            alt="Current Vacation"
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        ref={imageInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileSelect}
                    />
                </div>

                <br />

                <button>Edit Vacation</button>
            </form>
        </div>
    );
}

export default EditVacation;
