import { createStore } from "redux";
import FollowerModel from "../Models/FollowerModel";

// 1. App state - Application level state.
export class FollowerState {
    public follower: FollowerModel[] = [];
}

// 2. Action Type - list of actions needed on the data.
export enum FollowingActionType {
    AddFollower = "AddFollower",
    DeleteFollowing = "DeleteFollowing"
}

// 3. Action - a single object describing single operation on the data.
export interface FollowingAction {
    type: FollowingActionType;
    payload: any;
} 

// 4. Reducer - function performing the needed actions (the action object is the one sent via dispatch function).
export function followingReducer(currentState = new FollowerState(), action: FollowingAction): FollowerState {
    // Create a new state object based on the current state.
    const newState = { ...currentState };

    // Switch statement to handle different action types.
    switch (action.type) {
        case FollowingActionType.AddFollower:
            // Find the index of the follower with the same vacationId in the current state.
            const indexToFollow = newState.follower.findIndex(f => f.vacationId === action.payload.vacationId);

            // If a follower with the same vacationId exists, update it; otherwise, add the new follower.
            if (indexToFollow >= 0) {
                newState.follower[indexToFollow] = action.payload;
            } else {
                newState.follower.push(action.payload);
            }
            break;

        case FollowingActionType.DeleteFollowing:
            // Find the index of the follower with the same userId in the current state.
            const indexToDelete = newState.follower.findIndex(follow => follow.userId === action.payload);

            // If a follower with the same userId exists, update it; otherwise, do nothing.
            if (indexToDelete >= 0) {
                newState.follower[indexToDelete] = action.payload;
            }
            break;
    }

    // Return the new state.
    return newState;
}

// 5. Store - Redux manager:
// Create a Redux store using the followingReducer.
export const followingStore = createStore(followingReducer);