import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, LayoutAnimation, Platform, ScrollView, StyleSheet, UIManager, View } from "react-native";

import { base } from "../styles";
import { colors } from "../config";
import { PrimaryButton, SecondaryButton } from "../components/cta";
import { TextTag } from "../components/textTags";

const Xotoe = require("../assets/images/xotoe.gif");

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Home =({navigation})=>{
    const [showPage, setShowPage] = useState(false);
    const imageAnime = useRef(new Animated.Value(0)).current;

    const handleSinglePlayer=()=>{
        navigation.navigate("Game", {"playerMode": "SINGLE"});
    }

    const handleMultiPlayer=()=>{
        navigation.navigate("Game", {"playerMode": "MULTI"});
    }

    const handlePageAnime=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowPage(true);
    }

    const onLoadAnimation=()=>{
        Animated.timing(imageAnime, {
            toValue: 1,
            duration: 600,
            delay: 1500,
            useNativeDriver: false
        }).start(handlePageAnime);
    }

    const animeSize = imageAnime.interpolate({
        inputRange: [0, 1],
        outputRange: [120, 140]
    })

    useEffect(()=>{
        onLoadAnimation();
    },[]);

    return(
        <ScrollView style={[base.flex_fill, { backgroundColor: colors.__x_white }]} contentContainerStyle={base.flex_grow} keyboardShouldPersistTaps="handled">
            <View style={[base.flex_fill, base.page_h_padding, base.page_v_padding, base.align_stretch]}>
                <View style={[base.flex_fill, base.align_center, base.justify_center]}>
                    <Animated.View style={[base.position_relative, {width: animeSize, height: animeSize}]}>
                        <Image style={[base.position_absolute, base.w_100, base.h_100]} resizeMode="contain" source={Xotoe} />
                    </Animated.View>
                    {
                        showPage?
                        <View style={[base.pt_4, base.px_6]}>
                            <TextTag type="textM" style={[base.sans_400, base.text_center, {color: colors.__x_black}]}>Time to play! Select player mode to begin. How do you wish to play?</TextTag>
                        </View>
                        : null
                    }
                </View>
                {
                    showPage?
                    <View style={[base.py_6, base.align_stretch]}>
                        <View style={[base.align_stretch, base.pb_4]}>
                            <PrimaryButton text="Against Xotoe" onClick={handleSinglePlayer}/>
                        </View>
                        <View style={[base.align_stretch]}>
                            <SecondaryButton text="Against a friend" onClick={handleMultiPlayer}/>
                        </View>
                    </View>
                    : null
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 120,
        height: 120
    }
})

export default Home;