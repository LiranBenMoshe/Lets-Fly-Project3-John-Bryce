import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";
import UserModel from "../Models/UserModel";
import { VacationAction, VacationActionType, vacationsStore } from "../Redux/VacationState";


class VacationService {
    public async getAllVacations(userId: number): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.vacationUrl + userId);
        const vacation = response.data;
        return vacation;
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const response = await axios.get<VacationModel>(appConfig.vacationById + vacationId);
        const vacation = response.data;
        return vacation;
    }

    public async getAllUsers(): Promise<UserModel[]> {
        const response = await axios.get<UserModel[]>(appConfig.userUrl);
        const user = response.data;
        return user;
    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }
        await axios.post<VacationModel>(appConfig.vacationUrl, vacation, options);
    }

    public async editVacation(vacation: VacationModel): Promise<void> {

        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }

        const response = await axios.put<VacationModel>(appConfig.vacationUrl + vacation.vacationId, vacation, options);

        const updatedVacation = response.data;

        const action: VacationAction = { type: VacationActionType.UpdateVacation, payload: updatedVacation};
        vacationsStore.dispatch(action);
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.vacationUrl + vacationId);
    }

}

const vacationService = new VacationService();

export default vacationService;
