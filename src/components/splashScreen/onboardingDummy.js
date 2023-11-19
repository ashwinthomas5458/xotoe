import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

import { base, size } from "../../styles";
import { colors } from "../../config";
import { TextTag } from "../textTags";

const Xotoe = require("../../assets/images/icon.png");

const OnboardingSplashDummy = ({ anime, opacityAnime, triggerLayoutShift }) => {
    const splashAnimeStyle = useAnimatedStyle(() => {
        const size = interpolate(
            anime.value,
            [0, 1],
            [120, 200],
        );
        return {
            width: size,
            height: size
        };
    });

    const splashOpacityStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            opacityAnime.value,
            [0, 1],
            [0, 1],
        );
        return {
            opacity: opacity
        };
    });

    return (
        <Animated.View style={[base.position_absolute, base.display_flex, base.align_stretch, styles.wrapper, splashOpacityStyle, { backgroundColor: colors.__x_red }]}>
            <View style={[base.flex_fill, base.align_center, base.justify_center, base.py_4]}>
                <Animated.View style={[splashAnimeStyle]}>
                    <Image style={[base.w_100, base.h_100]} source={Xotoe} />
                </Animated.View>
                {
                    triggerLayoutShift ?
                        <View style={[base.pt_10, base.align_center]}>
                            <TextTag type="textXl" style={[base.sans_900, base.pb_4, { color: "#FFF0" }]}> </TextTag>
                            <TextTag type="textM" style={[base.sans_400, { color: "#FFF0" }]}> </TextTag>
                        </View>
                        : null
                }
            </View>
            {
                triggerLayoutShift ?
                    <View style={[base.pb_8]}>
                        <View style={[base.pb_10]}>
                            <View style={[styles.dummyBtn]}></View>
                        </View>
                        <View style={[base.pt_6, base.flex_row, base.align_center]}>
                            <View style={[styles.dummyIcon]}></View>
                        </View>
                    </View>
                    : null
            }
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
    dummyBtn: {
        width: 64,
        height: 64,
    },
    dummyIcon: {
        height: size.indicator
    }
})

export default OnboardingSplashDummy;