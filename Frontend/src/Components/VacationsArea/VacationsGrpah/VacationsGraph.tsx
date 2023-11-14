import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import vacationService from "../../../Services/VacationService";
import RoleModel from "../../../Models/RoleModel";
import "./VacationsGraph.css";
import { DownloadForOffline } from "@mui/icons-material";

function VacationsGraph(): JSX.Element {
    // State to store vacations data
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // Get user information from Redux store
    const userState = authStore.getState();
    const userId = userState.user.userId;

    // State to manage user role
    const [role, setRole] = useState<string>("");

    // Fetch vacations data from the server on component mount
    useEffect(() => {
        setRole(localStorage.getItem("role"));
        vacationService
            .getAllVacations(userId)
            .then((dbVacation) => setVacations(dbVacation))
            .catch((err) => alert(err.message));
    }, []);

    // Initialize an array to store CSV data
    let dataCsv = [];
    dataCsv.push(["Followers", "Destination"]);

    // Push the follower count and destination to the array.
    for (let i = 0; i < vacations.length; i++) {
        dataCsv.push([vacations[i]?.followersAmount, vacations[i]?.destination]);
    }

    // Initialize an array to store data for the BarChart
    let dataGraph = [];

    // Push the follower count and destination to the array.
    for (let i = 0; i < vacations.length; i++) {
        dataGraph.push({
            Destination: vacations[i]?.destination,
            Followers: vacations[i]?.followersAmount,
        });
    }

    // Set the document title
    useEffect(() => {
        document.title = "Lets Fly - Graph";
    }, []);

    // Manage login status and role
    const [isLoggedIn, setIsLoggedIn] = useState(authStore.getState().token !== null);
    const user = authStore.getState().user;
    const isAdmin = user?.roleId === RoleModel.Admin;

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            const updatedIsLoggedIn = authStore.getState().token !== null;
            setIsLoggedIn(updatedIsLoggedIn);
        });

        return () => unsubscribe();
    }, []);

    // Render the VacationsGraph component
    return (
        <div className="VacationsGraph">
            <div>
                <h2>Vacations Graph</h2>
                <div className="CsvLink">
                    <CSVLink data={dataCsv} filename={"VacationsFollowers.csv"}>
                        <button>
                            <DownloadForOffline /> Download CSV
                        </button>
                    </CSVLink>
                </div>
            </div>
            <div className="chart-container">
                <BarChart width={1300} height={400} data={dataGraph}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        className="numberOfFollowers"
                        dataKey="Destination"
                        fontSize={12} // Adjust the font size for X-axis labels
                        angle={-45} // Rotate X-axis labels for better visibility
                        dy={10} // Adjust the vertical position of X-axis labels
                        tick={{ fill: "red", fontSize: 12 }} // Adjust tick font size and color
                    />
                    <YAxis
                        allowDecimals={false}
                        fontSize={12} // Adjust the font size for Y-axis labels
                        tick={{ fill: "red", fontSize: 12 }} // Adjust tick font size and color
                    />
                    <Tooltip
                        labelStyle={{ fontSize: 20 }} // Adjust label font size in Tooltip
                        itemStyle={{ fontSize: 18 }} // Adjust item font size in Tooltip
                    />
                    <Bar dataKey="Followers" fill={"black"} />
                </BarChart>
            </div>
        </div>
    );
}

export default VacationsGraph;
