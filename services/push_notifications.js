import { Notifications, Permissions } from 'expo';


export default async () => {
    let previousToken = await AsyncStorage.getItem('pushToken');

    if (previsouToken) {
        return;
    } else {
        let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
    }
};
