import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import { size } from "../../styles";
import Animated from "react-native-reanimated";

type TextType = "displayXxl" | "displayXl" | "displayLg" | "displayM" | "textXl" | "textLg" | "textM" | "textSm" | "textXs" | "tag";
interface PropsType {
    type: TextType,
    children: any,
    onPress?: any,
    style?: TextStyle[],
    numberOfLines?: number
}

const AnimatedTextTag = (props: PropsType) => {

    return (
        <Animated.Text numberOfLines={props.numberOfLines} style={ props.style? [styles[props.type], ...props.style]: styles[props.type]} onPress={props.onPress}>{props.children}</Animated.Text>
    )
}

const styles = StyleSheet.create({
    displayXxl: {
        fontSize: size.FS_40,
        lineHeight: size.FS_60
    },
    displayXl: {
        fontSize: size.FS_28,
        lineHeight: size.FS_34
    },
    displayLg: {
        fontSize: size.FS_24,
        lineHeight: size.FS_32
    },
    displayM: {
        fontSize: size.FS_22,
        lineHeight: size.FS_30
    },
    textXl: {
        fontSize: size.FS_20,
        lineHeight: size.FS_30
    },
    textLg: {
        fontSize: size.FS_18,
        lineHeight: size.FS_28
    },
    textM: {
        fontSize: size.FS_16,
        lineHeight: size.FS_24
    },
    textSm: {
        fontSize: size.FS_14,
        lineHeight: size.FS_22
    },
    textXs: {
        fontSize: size.FS_12,
        lineHeight: size.FS_18
    },
    tag: {
        fontSize: size.FS_10,
        lineHeight: size.FS_16
    }
})

export default AnimatedTextTag;