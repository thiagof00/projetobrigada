import * as Location from 'expo-location';

export type UserLocation = {
  latitude: number;
  longitude: number;
};


export async function getLocation(): Promise<UserLocation | null>{
    
    try {
        const { status} = await Location.requestForegroundPermissionsAsync()
        console.log("Permissão de GPS: ", status);


        if(status !== "granted"){
            console.warn("Permissão de localização negada.")
            return null;
        }

        const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High
        })

        return {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
        }
    } catch (err){
        console.error("Erro ao obter a localização. ", err)
        return null
    }

}