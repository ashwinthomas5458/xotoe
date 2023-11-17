import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

type OnboardingDataType = "COMPLETED"|string|null;

const useStorage=()=>{
    async function checkIfOnboardingShown(){
        let onboardingStatus: OnboardingDataType = await AsyncStorage.getItem("X_APP_ONB");
        return onboardingStatus;
    }

    async function updateOnboardingStatus(){
        let onboardingStatus = "COMPLETED";
        await AsyncStorage.setItem("X_APP_ONB", onboardingStatus);
    }

    return { 
        updateOnboardingStatus,
        checkIfOnboardingShown
    }
}

export default useStorage;