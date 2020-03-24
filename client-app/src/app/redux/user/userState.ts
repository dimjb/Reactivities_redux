import { IUser } from "../../models/user";

export interface IUserState {
    user: IUser | null;
    error: string | null;
    userDisplayName: string | null,
    userImage: string | null
}