import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import followingService from "../../../Services/FollowingsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import "./VacationCard.css";

// Define the props interface for VacationCard
interface VacationCardProps {
    vacation: VacationModel;
    deleteMe: (vacationId: number) => void;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    // Format the price to display with a dollar sign
    function formatPrice(price: number): string {
        return `$${price.toFixed(2)}`;
    }

    // Get user information from Redux store
    const userState = authStore.getState();
    const userId = userState.user.userId;

    // States to manage followers and follow status
    const [followersAmount, setFollowersAmount] = useState(props.vacation.followersAmount);
    const [followStatus, setFollowStatus] = useState(false);

    // Role of the user (admin or regular user)
    const [role, setRole] = useState<string>("");

    // Use useEffect to set user role and follow status based on userState and vacation props
    useEffect(() => {
        setRole(userState.user.roleId === 1 ? "admin" : "user");
        setFollowStatus(props.vacation.isFollowing !== 0);
    }, [userState, props.vacation]);

    // Function to toggle the follow status of the vacation
    async function toggleFollowStatus() {
        try {
            const vacationId = +props.vacation.vacationId;
            if (!followStatus) {
                // Follow the vacation
                await followingService.follow(vacationId, userId);
                setFollowStatus(true);
                setFollowersAmount(prevCount => prevCount + 1);
            } else {
                // Unfollow the vacation
                await followingService.unfollow(vacationId, userId);
                setFollowStatus(false);
                setFollowersAmount(prevCount => prevCount - 1);
            }
        } catch (err: any) {
            alert(err.message);
        }
    }

    // Format a date string into a localized date format
    function formatTime(date: string): string {
        const time = new Date(date);
        return time.toLocaleDateString("he-IL");
    }

    // Render the VacationCard component
    return (
        <div className="VacationCard">
            <div className="image-container">
                <img src={props.vacation.imageName} alt="Vacation" />
                <h3 className="destination">{props.vacation.destination}</h3>
            </div>
            {role === "admin" && (
                <NavLink className="edit-button" to={"/vacations/edit/" + props.vacation.vacationId}>
                    ✏️
                </NavLink>
            )}
            {role === "admin" && (
                <button className="delete-button" onClick={() => props.deleteMe(props.vacation.vacationId)}>
                    🗑️
                </button>
            )}
            {role === "user" && (
                <button
                    onClick={toggleFollowStatus}
                    className={`follow-button${followStatus ? " following" : ""}`}
                >
                    <FontAwesomeIcon
                        icon={followStatus ? faHeart : faHeartBroken}
                        className={`follow-icon${followStatus ? " following" : ""}`}
                    />
                    &nbsp;
                    {followStatus ? (
                        <span>Following, Followers: {followersAmount}</span>
                    ) : (
                        <span>Not Following, Followers: {followersAmount}</span>
                    )}
                </button>
            )}
            <div className="description-container">
                <p className="description">{props.vacation.description}</p>
            </div>
            <div className="card-bottom">
                <div className="date-and-price">
                    <span className="date">
                        <i className="fas fa-calendar-alt date-icon"></i> {formatTime(props.vacation.startDate)} - {formatTime(props.vacation.endDate)}
                    </span>
                    <p className="price">{formatPrice(+props.vacation.price)}</p>
                </div>
            </div>
        </div>
    );
}

export default VacationCard;
