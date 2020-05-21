import {Platform, BackHandler, PermissionsAndroid } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-simple-toast';
export const INTERNET_CONNECTION_ERROR = "Por favor, compruebe su conexión a Internet y vuelva a intentarlo.";



export const emailValidator = (val) => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        val
    );
};
export const isOnline = (success, reject) => {
    NetInfo.fetch().then(isConnected => {
        if (isConnected) {
            success(true);
        } else
            reject(false);
    })
}




export const showToast = (message) => {
    Toast.show(message)
  
}





// export { hello }
