import axios from "axios";
import FollowerModel from "../Models/FollowerModel";
import { FollowingActionType, followingStore } from "../Redux/FollowingState";
import appConfig from "../Utils/AppConfig";

class FollowingService {
    public async follow(vacationId: number, userId: number): Promise<void> {
        const response = await axios.post<FollowerModel>(appConfig.followingUrl + userId + "/" + vacationId);
        const addedFollow = response.data;
        followingStore.dispatch({ type: FollowingActionType.AddFollower, payload: addedFollow });
    }

    public async unfollow(vacationId: number, userId: number): Promise<void> {
        await axios.delete(appConfig.followingUrl + userId + "/" + vacationId);
        followingStore.dispatch({ type: FollowingActionType.DeleteFollowing, payload: vacationId });
    }
}

const followingService = new FollowingService();

export default followingService;