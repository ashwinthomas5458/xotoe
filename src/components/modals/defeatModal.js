import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";

import { base, size } from "../../styles";
import { colors } from "../../config";

import { TextTag } from "../textTags";
import { PrimaryButton } from "../cta";
import useAppFlags from "../../context/useFlagsContext";

const DefeatIllustration = require("../../assets/images/defeat.png");

const MODAL_WIDTH = 360;
const MAX_WIDTH = size.width - 48;
const MODAL_X_PADDING = 24;

const DefeatModal = ({
    showModal,
    closeModal,
    handleGameReboot
}) => {
    const { windowSize } = useAppFlags();

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={closeModal}
            style={[base.flex_fill]}
        >
            <SafeAreaView style={[base.flex_fill]}>
                <View style={[base.position_relative, base.align_center, base.justify_center, styles.mainWrapperWidth, {height: windowSize?.height}]}>
                    <TouchableOpacity activeOpacity={0.6} onPress={closeModal} style={[base.position_absolute, styles.modalBackdrop, styles.mainWrapperWidth, base.h_100, { backgroundColor: colors.__modal_bg }]}></TouchableOpacity>
                    <View style={[styles.wrapper, base.position_relative]}>
                        <View style={[base.w_100, base.h_100, base.position_absolute, styles.shadow, { backgroundColor: colors.__x_black }]}></View>
                        <View style={[styles.modalContainer, base.p_8, base.w_100, base.align_center, { backgroundColor: colors.__x_white, borderColor: colors.__x_black }]}>
                            <Image style={[styles.illustration]} source={DefeatIllustration}/>
                            <TextTag type="textM" style={[base.sans_800, base.pb_3, base.pt_6, { color: colors.__x_black }]}>Hard luck!</TextTag>
                            <TextTag type="textM" style={[base.sans_400, base.pb_8, { color: colors.__x_black }]}>Consider it a setback, not a defeat. It happens to the best of us! Step up your game for the next match.</TextTag>
                            <PrimaryButton type="md" text="Play again" onClick={handleGameReboot} />
                            <View style={[base.pt_6, base.align_center]}>
                                <TextTag type="textSm" onPress={closeModal} style={[base.sans_800, base.pb_4, styles.textBtn, { color: colors.__x_orange, textDecorationColor: colors.__x_orange }]}>Back home</TextTag>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    mainWrapperWidth: {
        width: size.width,
    },
    modalBackdrop: {
        top: 0,
        left: 0
    },
    wrapper: {
        width: MODAL_WIDTH,
        maxWidth: MAX_WIDTH,
    },
    avatarWrap: {
        borderRadius: 40,
        borderWidth: 2,
        padding: 1
    },
    modalContainer: {
        borderRadius: 16,
        borderWidth: 3,
        minHeight: 100,
        padding: MODAL_X_PADDING
    },
    shadow: {
        borderRadius: 16,
        top: 6,
        left: 6
    },
    illustration: {
        width: size.FS_120,
        height: size.FS_120
    },
    textBtn: {
        textDecorationStyle: "solid",
        textDecorationLine: "underline"
    }
});

export default DefeatModal;