import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationsGraph from "../../VacationsArea/VacationsGrpah/VacationsGraph";
import PageNotFound from "../PageNotFound/PageNotFound";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import RoleModel from "../../../Models/RoleModel";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import Home from "../../HomeArea/Home/Home";


function Routing(): JSX.Element {

    const [isLoggedIn, setIsLoggedIn] = useState(authStore.getState().token !== null);
    const user = authStore.getState().user; // Get user from Redux store
    const isAdmin = user?.roleId === RoleModel.Admin; // Check if the user is an admin

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            const updatedIsLoggedIn = authStore.getState().token !== null;
            setIsLoggedIn(updatedIsLoggedIn);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Routes>

            {isAdmin &&
                <>
                    <Route path="/vacations" element={<VacationsList />} />
                    <Route path="/insert" element={<AddVacation />} />
                    <Route path="/vacations/edit/:prodId" element={<EditVacation />} />
                    <Route path="/graph" element={<VacationsGraph />} />
                    <Route path="/login" element={<Navigate to="/vacations" />} />
                    <Route path="/register" element={<Navigate to="/vacations" />} />
                    <Route path="/" element={<Navigate to="/vacations" />} />
                    <Route path="*" element={<PageNotFound />} />

                </>
            }

            {isLoggedIn &&
                <>
                    <Route path="/vacations" element={<VacationsList />} />
                    <Route path="/login" element={<Navigate to="/vacations" />} />
                    <Route path="/register" element={<Navigate to="/vacations" />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/home" element={<Home />} />
                </>
            }

            {!isLoggedIn && !isAdmin && <>
                <Route path="/vacations" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </>}

        </Routes>
    );
}

export default Routing;
