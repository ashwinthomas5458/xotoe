import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { base, size } from "../../styles";
import { colors } from "../../config";

import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";

const B_DISPLACEMENT = 4;

const RoundedArrowButton=({ onClick, scrollX })=>{
    const buttonAnime = useSharedValue(0);

    const onPressIn=()=>{
        buttonAnime.value = withSpring(1, {damping:  0.4866, stiffness: 1.4});
    }

    const onPressOut=()=>{
        buttonAnime.value = withSpring(0, {damping:  0.4866, stiffness: 1.4});
    }

    const displacementAnimeStyle = useAnimatedStyle(() => {

        const translate = interpolate(
            buttonAnime.value,
            [0, 1],
            [0, B_DISPLACEMENT],
        );

        return {
            transform: [{translateX: translate}, {translateY: translate}]
        };
    });

    const btnAnimeStyle = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(
            scrollX.value,
            [
                0,
                size.width,
                2*size.width
            ],
            [colors.__x_blue, colors.__x_green, colors.__x_orange]
        );

        return {
            backgroundColor: backgroundColor
        };
    });

    return(
        <Pressable style={[base.align_stretch, styles.wrapper]} onPressIn={onPressIn} onPressOut={onPressOut} onPress={onClick}>
            <View style={[base.align_stretch, base.position_relative]}>
                <View style={[styles.shadow, styles.btnSize, {backgroundColor: colors.__x_black}]}></View>
                <Animated.View style={[base.position_absolute, base.flex_row, base.align_center, base.justify_center, base.w_100, base.h_100, styles.container,displacementAnimeStyle, btnAnimeStyle, { borderColor: colors.__x_black}]}>
                    <Svg width="10" height="18" viewBox="0 0 10 18" fill="none">
                        <Path d="M1 17L9 9L1 1" stroke={colors.__x_black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </Svg>
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
        borderWidth: B_DISPLACEMENT/2
    }
})

export default RoundedArrowButton;