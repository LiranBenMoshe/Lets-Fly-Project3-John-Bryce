import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. Global State:
export class VacationState {
    public vacations: VacationModel[] = []; // Initialize with an empty array.
}

// 2. Action Type:
export enum VacationActionType {
    SetVacation = "SetVacation",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    ClearAll = "ClearAll"
}

// 3. Action:
export interface VacationAction {
    type: VacationActionType; // Action Type.
    payload?: any; // The data related to that action.
}

// 4. Reducer (invoked by redux library): 
export function vacationReducer(currentState = new VacationState(), action: VacationAction): VacationState {
    // Create a new state object based on the current state.
    const newState = { ...currentState }; // Duplicate the global state using the Spread Operator.

    // Change the duplicated global state according to the action:
    switch (action.type) {
        case VacationActionType.SetVacation:
            // Set the entire vacations array from the payload.
            newState.vacations = action.payload; // Save all vacations into global state.
            break;

        case VacationActionType.AddVacation:
            // Add a single vacation from the payload to the global state.
            newState.vacations.push(action.payload); // Add that vacation into the global state.
            break;

        case VacationActionType.UpdateVacation:
            // Find the index of the vacation with the specified id and update it.
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.id);
            if (indexToUpdate >= 0) newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationActionType.DeleteVacation:
            // Find the index of the vacation with the specified id and remove it.
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if (indexToDelete >= 0) newState.vacations.splice(indexToDelete, 1);
            break;

        case VacationActionType.ClearAll:
            // Clear all vacations from the global state.
            newState.vacations = [];
            break;
    }

    return newState; // Return the changed duplicated global state.
}

// 5. Store:
// Create a Redux store using the vacationReducer.
export const vacationsStore = createStore(vacationReducer);