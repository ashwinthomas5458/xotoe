import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboarding from "../screens/onboarding";

const Stack = createNativeStackNavigator();

const OnboardingRoute = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={Onboarding} />
        </Stack.Navigator>
    )
}

export default OnboardingRoute;