import React from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

import { base } from "../../styles";
import { colors } from "../../config";

const Xotoe = require("../../assets/images/icon.png");

const SplashAnime = ({anime}) => {

    return (
        <Animated.View style={[base.position_absolute, base.display_flex, base.align_stretch, styles.wrapper, { backgroundColor: colors.__x_orange, opacity: anime}]}>
            <View style={[base.flex_fill, base.align_center, base.justify_center]}>
                <Image style={[styles.icon]} source={Xotoe} />
            </View>
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
    icon: {
        width: 120,
        height: 120
    }
})

export default SplashAnime;