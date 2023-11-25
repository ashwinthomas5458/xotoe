import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { Path, Svg } from "react-native-svg";

import { base, size } from "../../styles";
import { colors } from "../../config";

import Animated, { interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const B_DISPLACEMENT = 4;
const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};

const RoundedArrowButton = ({ type, onClick, scrollX }) => {
    const buttonAnime = useSharedValue(0);

    const onPressIn = () => {
        ReactNativeHapticFeedback.trigger("impactLight", options);
        buttonAnime.value = withSpring(1);
    }

    const onPressOut = () => {
        ReactNativeHapticFeedback.trigger("impactLight", options);
        buttonAnime.value = withSpring(0);
    }

    const displacementAnimeStyle = useAnimatedStyle(() => {

        const translate = interpolate(
            buttonAnime.value,
            [0, 1],
            [0, B_DISPLACEMENT],
        );

        return {
            transform: [{ translateX: translate }, { translateY: translate }]
        };
    });

    const btnAnimeStyle = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(
            scrollX.value,
            [
                0,
                size.width,
                2 * size.width
            ],
            [colors.__x_blue, colors.__x_green, colors.__x_orange]
        );

        return {
            backgroundColor: backgroundColor
        };
    });

    return (
        <Pressable style={[base.align_stretch, styles.wrapper]} onPressIn={onPressIn} onPressOut={onPressOut} onPress={onClick}>
            <View style={[base.align_stretch, base.position_relative]}>
                <View style={[styles.shadow, styles.btnSize, { backgroundColor: colors.__x_black }]}></View>
                <Animated.View style={[base.position_absolute, base.flex_row, base.align_center, base.justify_center, base.w_100, base.h_100, styles.container, displacementAnimeStyle, btnAnimeStyle, { borderColor: colors.__x_black }]}>
                    {
                        type === "right" ?
                            <Svg width="11" height="19" viewBox="0 0 11 19" fill="none">
                                <Path fillRule="evenodd" clipRule="evenodd" d="M0.542893 0.792893C0.933417 0.402369 1.56658 0.402369 1.95711 0.792893L9.95711 8.79289C10.3476 9.18342 10.3476 9.81658 9.95711 10.2071L1.95711 18.2071C1.56658 18.5976 0.933417 18.5976 0.542893 18.2071C0.152369 17.8166 0.152369 17.1834 0.542893 16.7929L7.83579 9.5L0.542893 2.20711C0.152369 1.81658 0.152369 1.18342 0.542893 0.792893Z" fill={colors.__x_black} />
                            </Svg>
                            : type === "left" ?
                                <Svg width="11" height="19" viewBox="0 0 11 19" fill="none">
                                    <Path fillRule="evenodd" clipRule="evenodd" d="M10.4571 0.792893C10.0666 0.402369 9.43342 0.402369 9.04289 0.792893L1.04289 8.79289C0.652369 9.18342 0.652369 9.81658 1.04289 10.2071L9.04289 18.2071C9.43342 18.5976 10.0666 18.5976 10.4571 18.2071C10.8476 17.8166 10.8476 17.1834 10.4571 16.7929L3.16421 9.5L10.4571 2.20711C10.8476 1.81658 10.8476 1.18342 10.4571 0.792893Z" fill={colors.__x_black} />
                                </Svg>
                                : null
                    }
                </Animated.View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: B_DISPLACEMENT,
        paddingTop: B_DISPLACEMENT
    },
    btnSize: {
        width: 60,
        height: 60
    },
    shadow: {
        borderRadius: 50
    },
    container: {
        top: -B_DISPLACEMENT,
        left: -B_DISPLACEMENT,
        borderRadius: 50,
        borderWidth: B_DISPLACEMENT / 2
    }
})

export default RoundedArrowButton;