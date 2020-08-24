import functions from "@react-native-firebase/functions";

export const REGISTER_USER = async (data) => {
    console.log('DATA', data);
    const registerUser = functions().httpsCallable("registerUser")
    try {
        const result = await registerUser({
            ...data, //  number
        });
        console.log("FIRST RESULT", result);
        return result;
    } catch (error) {
        //console.log("ERROR", error);
        return error;
    }
}