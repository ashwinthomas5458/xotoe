import React, { useRef } from "react";
import { ActivityIndicator, Animated, Pressable, StyleSheet, View } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { base, size } from "../../styles";
import { colors } from "../../config";

import { TextTag } from "../textTags";

const B_DISPLACEMENT = 6;
const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};
type PrimaryButtonProps={
    type?: "md"|"lg"|undefined,
    text: string,
    onClick:()=>void,
    isDisabled:boolean,
    isLoading?:boolean,
    onDisabledClick: ()=>void
}

const PrimaryButton=({
    type="lg",
    text,
    onClick,
    isDisabled,
    isLoading,
    onDisabledClick
}:PrimaryButtonProps)=>{
    const buttonAnime = useRef(new Animated.Value(0)).current;

    const onPressIn=()=>{
        ReactNativeHapticFeedback.trigger("impactLight", options);
        Animated.spring(buttonAnime,{
            toValue: 1,
            friction: 15,
            tension: 140,
            useNativeDriver: true
        }).start();
    }

    const onPressOut=()=>{
        ReactNativeHapticFeedback.trigger("impactLight", options);
        Animated.spring(buttonAnime,{
            toValue: 0,
            friction: 15,
            tension: 140,
            useNativeDriver: true
        }).start(onButtonPress);
    }

    const displacement = buttonAnime.interpolate({
        inputRange: [0, 1],
        outputRange: [0, B_DISPLACEMENT]
    });

    const onButtonPress = () => {
        try {
            if (isDisabled || isLoading) onDisabledClick();
            else onClick();
        } catch (error) { console.log(error) }
    }

    return(
        <Pressable style={[base.align_stretch, styles.wrapper]} onPressIn={onPressIn} onPressOut={onPressOut}>
            <View style={[base.align_stretch, base.position_relative]}>
                <View style={type==="lg"?[base.py_6, styles.shadow, {backgroundColor: colors.__x_black}, base.px_8]: [base.py_4, styles.shadow, {backgroundColor: colors.__x_black}, base.px_6]}>
                   <TextTag type={type==="lg"? "textM": "textSm"} style={[base.sans_600, base.px_2, {color: colors.__x_black}]}>{text}</TextTag>
                </View>
                <Animated.View style={[base.position_absolute, base.flex_row, base.align_center, base.justify_center, base.w_100, base.h_100, styles.container, {backgroundColor: isDisabled||isLoading? colors.__x_grey:colors.__x_orange, borderColor: colors.__x_black, transform:[{translateX: displacement}, {translateY: displacement}]}]}>
                    <TextTag type={type==="lg"? "textM": "textSm"} style={[base.sans_800, base.px_2, {color: colors.__x_black}]}>{text}</TextTag>
                    { isLoading? <ActivityIndicator color={colors.__x_black} size={size.FS_12}/>: null}
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
    shadow: {
        borderRadius: 8
    },
    container: {
        top: -B_DISPLACEMENT,
        left: -B_DISPLACEMENT,
        borderRadius: 8,
        borderWidth: B_DISPLACEMENT/2
    }
})

export default PrimaryButton;