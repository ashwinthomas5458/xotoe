import React, { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, View } from "react-native";
import SplashScreen from "react-native-splash-screen";

import SplashAnime from "../components/splashScreen";

import { base } from "../styles";
import { colors } from "../config";

import AppRoutes from "./appRoutes";
import OnboardingRoute from "./onboardingRoute";
import useAppFlags, { FlagDataProvider } from "../context/useFlagsContext";
import { useStorage } from "../services/hooks";

const RoutesContainer = () => {
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const splashAnime = useRef(new Animated.Value(1)).current;
    const { showOnboardingScreen, updateOnboardingFlag } = useAppFlags();
    const { checkIfOnboardingShown } = useStorage();

    const checkOnboarding = async ()=>{
        let isComplete = await checkIfOnboardingShown();
        if(isComplete && isComplete==="COMPLETED") updateOnboardingFlag(false);
    }

    const handleSplashCallback = () => {
        setShowSplashScreen(false);
    }

    const handleSplashScreen = () => {
        SplashScreen.hide();
        Animated.timing(splashAnime, {
            toValue: 0,
            duration: 500,
            delay: 1000,
            useNativeDriver: true
        }).start(handleSplashCallback);
    }

    useEffect(() => {
        checkOnboarding();
        handleSplashScreen();
    }, []);

    return (
        <>
            <View style={[base.flex_fill]}>
                <SafeAreaView style={[base.flex_fill]}>
                    <View style={[base.flex_fill, base.position_relative, { backgroundColor: colors.__x_white }]}>
                        {
                            showOnboardingScreen ?
                                <OnboardingRoute />
                                : <AppRoutes />
                        }
                        {showSplashScreen ? <SplashAnime anime={splashAnime} /> : null}
                    </View>
                </SafeAreaView>
            </View>
        </>
    )
}

const Routes = () => {
    return (
        <FlagDataProvider>
            <RoutesContainer />
        </FlagDataProvider>
    )
}

export default Routes;