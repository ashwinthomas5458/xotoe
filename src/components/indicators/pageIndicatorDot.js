import React from "react";
import { StyleSheet } from "react-native";
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated";

import { size } from "../../styles";
import { colors } from "../../config";

const PageIndicatorDot = ({ index, scrollX, cardWrapperWidth }) => {

    const widthAnimeStyle = useAnimatedStyle(() => {
        const widthAnimation = interpolate(
            scrollX.value,
            [
                ((index - 1) * cardWrapperWidth), 
                index * cardWrapperWidth, 
                ((index + 1) * cardWrapperWidth)
            ],
            [size.indicator, 2*size.indicator, size.indicator],
            Extrapolate.CLAMP,
        );

        return {
            width: widthAnimation,
        };
    });

    const colorAnimeStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            scrollX.value,
            [
                ((index - 1) * cardWrapperWidth), 
                index * cardWrapperWidth, 
                ((index + 1) * cardWrapperWidth)
            ],
            [colors.__x_white, colors.__x_black, colors.__x_white],
        );

        return {
            backgroundColor: backgroundColor,
        };
    });

    return (
        <Animated.View style={[styles.indicatorDot, widthAnimeStyle, colorAnimeStyle]}></Animated.View>
    )
}

const styles = StyleSheet.create({
    indicatorDot: {
        height: size.indicator,
        borderRadius: size.indicator/2,
        marginHorizontal: size.indicator / 2
    }
})

export default PageIndicatorDot;