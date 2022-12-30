import Constant from "expo-constants";
import { Alert, Platform, ToastAndroid } from 'react-native';

const CustomToast = (msg) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg? msg: "msg is not defined", ToastAndroid.LONG)
    } else {
        Alert.alert(Constant.expoConfig.name, msg?msg: "msg is not defined", 
        [
            {
                text: "OK",
                style:"destructive"
            }
        ])
    }

}

export default CustomToast