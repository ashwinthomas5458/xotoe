import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/home";
import Game from "../screens/game";

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
    )
}

export default AppRoutes;