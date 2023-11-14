import React, { useEffect, useState } from "react";
import RoleModel from "../../../Models/RoleModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

function VacationsList(): JSX.Element {
    // Get user information from the Redux store
    const userState = authStore.getState();
    const userId = userState.user.userId;

    // State to store frontend vacations data
    const [frontendVacation, setFrontendVacation] = useState<VacationModel[]>([]);

    // State to manage pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const cardsPerPage = 9;

    // State to manage user login status and role
    const [isLoggedIn, setIsLoggedIn] = useState(authStore.getState().token !== null);
    const user = authStore.getState().user;
    const isAdmin = user?.roleId === RoleModel.Admin;

    // Subscribe to changes in login status
    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            const updatedIsLoggedIn = authStore.getState().token !== null;
            setIsLoggedIn(updatedIsLoggedIn);
        });

        return () => unsubscribe();
    }, []);

    // State to manage filtering options
    const [showFollowingOnly, setShowFollowingOnly] = useState(false);
    const [showNotStartedOnly, setShowNotStartedOnly] = useState(false);
    const [showActiveOnly, setShowActiveOnly] = useState(false);

    // Current date
    const nowDate = new Date();

    // Fetch and filter vacations data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const backendVacation = await vacationService.getAllVacations(userId);
                const filteredVacation = filterVacations(backendVacation);
                setFrontendVacation(filteredVacation);
            } catch (err: any) {
                notifyService.error(err);
            }
        };

        fetchData();
    }, [userId, showFollowingOnly, showNotStartedOnly, showActiveOnly]);

    // Delete a vacation
    async function deleteVacation(vacationId: number): Promise<void> {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;

            // Delete the vacation from the backend
            await vacationService.deleteVacation(vacationId);

            // Update the frontend vacation state by removing the deleted vacation
            setFrontendVacation(prevVacations =>
                prevVacations.filter(vacation => vacation.vacationId !== vacationId)
            );

            notifyService.success("Vacation has been deleted successfully.");
        } catch (err: any) {
            notifyService.error(err);
        }
    }


    // Filter vacations based on filter options
    function filterVacations(vacations: VacationModel[]): VacationModel[] {
        const filteredVacations = vacations.filter((vacation) => {
            const isFollowing = !showFollowingOnly || vacation.isFollowing;
            const isNotStarted = !showNotStartedOnly || new Date(vacation.startDate) > nowDate;
            const isActive =
                !showActiveOnly || (new Date(vacation.startDate) <= nowDate && new Date(vacation.endDate) >= nowDate);
            return isFollowing && isNotStarted && isActive;
        });
        return filteredVacations;
    }

    // Handle show following filter option
    function handleShowFollowingChange() {
        setShowFollowingOnly(!showFollowingOnly);
        setCurrentPage(1); // Reset page to 1 when filter changes
    }

    // Handle show not started filter option
    function handleShowNotStartedChange() {
        setShowNotStartedOnly(!showNotStartedOnly);
        setCurrentPage(1); // Reset page to 1 when filter changes
    }

    // Handle show active filter option
    function handleShowActiveChange() {
        setShowActiveOnly(!showActiveOnly);
        setCurrentPage(1); // Reset page to 1 when filter changes
    }


    // Calculate the range of displayed cards
    const calculateCardRange = () => {
        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        return frontendVacation.slice(startIndex, endIndex);
    }

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }

    // Calculate the total number of pages
    const totalPages = Math.ceil(frontendVacation.length / cardsPerPage);

    // Set the document title
    useEffect(() => {
        document.title = "Lets Fly - Vacations";
    }, []);

    // Render the VacationsList component
    return (
        <div className="VacationsList">
            <h2>Vacations</h2>
            {isLoggedIn && !isAdmin && (
                <div className="filter-options">
                    <label
                        className={showFollowingOnly ? '' : 'off'}
                        onClick={handleShowFollowingChange}
                    >
                        Show Following Only
                    </label>
                    <label
                        className={showNotStartedOnly ? '' : 'off'}
                        onClick={handleShowNotStartedChange}
                    >
                        Show Not Started Only
                    </label>
                    <label
                        className={showActiveOnly ? '' : 'off'}
                        onClick={handleShowActiveChange}
                    >
                        Show Active Only
                    </label>
                </div>
            )}
            <div className="pagination">
                <button
                    className="prev-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="page-indicator">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    className="next-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage * cardsPerPage >= frontendVacation.length}
                >
                    Next
                </button>
            </div>
            <div className="cards-container">
                {calculateCardRange().map((v) => (
                    <VacationCard key={v.vacationId} vacation={v} deleteMe={deleteVacation} />
                ))}
            </div>
            <div className="pagination">
                <button
                    className="prev-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="page-indicator">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    className="next-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage * cardsPerPage >= frontendVacation.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default VacationsList;
