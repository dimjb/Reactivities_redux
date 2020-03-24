import { IActivity, IAttendee } from "../../models/activity";
import { IUser } from "../../models/user";
import { IPredicate, IActivityMap } from "../../redux/activities/activitiesState";
import { HubConnectionBuilder, LogLevel, HttpTransportType, HubConnection } from "@microsoft/signalr";

export const convertActivitiesToMap =
	(activities: IActivity[]) => activities.reduce((acc, activity) => {
		acc[activity.id] = activity;
		return acc;
	}, {} as IActivityMap)

export const groupActivitiesByDate = (activities: IActivity[]) => {
	const sortedActivities = activities.sort((a, b) => a.date.getTime() - b.date.getTime())
	return Object.entries(sortedActivities.reduce((activities, activity) => {
		const date = activity.date.toISOString().split('T')[0];
		activities[date] = activities[date] ? [...activities[date], activity] : [activity];
		return activities;
	}, {} as { [key: string]: IActivity[] }));
}

export const LIMIT = 2;

export const axiosParams = (predicate: IPredicate) => {
	const params = new URLSearchParams();

	Object.entries(predicate).forEach(
		([key, value]) => {
			if (value instanceof Date) {
				params.append('startDate', value.toISOString())
			} else {
				params.append(key, value)
			}
		}
	);

	return params;
}

export const combineDateAndTime = (date: Date, time: Date) => {
	const dateStr = date.toISOString().split('T')[0];
	const timeStr = time.toISOString().split('T')[1];
	return new Date(dateStr + 'T' + timeStr);
}

export const setActivityProps = (activity: IActivity, user: IUser) => {
	activity.date = new Date(activity.date);
	activity.isGoing = activity.attendees.some(
		a => a.username === user.username
	);
	activity.isHost = activity.attendees.some(
		a => a.username === user.username && a.isHost
	);

	return activity;
}

export const createAttendee = (user: IUser): IAttendee => {
	return {
		displayName: user.displayName,
		isHost: false,
		username: user.username,
		image: user.image!
	}
}

export let hubConnection: HubConnection | null = null;

export const createHubConnection = (action: any) => {
	hubConnection = new HubConnectionBuilder()
		.withUrl(process.env.REACT_APP_API_CHAT_URL!, {
			accessTokenFactory: () => localStorage.getItem('jwt')!,
			skipNegotiation: true,
			transport: HttpTransportType.WebSockets
		})
		.configureLogging(LogLevel.None)
		.build();
	if (!hubConnection) {
		hubConnection = new HubConnectionBuilder()
			.withUrl(process.env.REACT_APP_API_CHAT_URL!, {
				accessTokenFactory: () => localStorage.getItem('jwt')!,
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets
			})
			.configureLogging(LogLevel.Information)
			.build();
	}

	hubConnection!.start();

	hubConnection!.on('ReceiveComment', comment => action(comment));
}

export const stopHubConnection = () => {
	if (hubConnection)
		hubConnection!.stop();
	hubConnection = null;
}

