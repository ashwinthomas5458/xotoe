import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { base, size } from "../../styles";
import { colors } from "../../config";
import { TextTag } from "../textTags";
import { PrimaryButton } from "../cta";
import SIZE from "../../styles/size";
import { Path, Svg } from "react-native-svg";

const MODAL_WIDTH = 360;
const MAX_WIDTH = size.width - 48;
const MODAL_X_PADDING = 24;

const ScoreModal = ({
    showModal,
    closeModal,
    gameStatus,
    playerInfo
}) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={closeModal}
            style={[base.flex_fill]}
        >
            <SafeAreaView style={[base.flex_fill]}>
                <View style={[base.position_relative, base.align_center, base.justify_center, styles.mainWrapperWidth, base.h_100]}>
                    <TouchableOpacity activeOpacity={0.6} onPress={closeModal} style={[base.position_absolute, styles.modalBackdrop, styles.mainWrapperWidth, base.h_100, { backgroundColor: colors.__modal_bg }]}></TouchableOpacity>
                    <View style={[styles.wrapper, base.position_relative]}>
                        <View style={[base.w_100, base.h_100, base.position_absolute, styles.shadow, { backgroundColor: colors.__x_black }]}></View>
                        <View style={[styles.modalContainer, base.p_8, base.w_100, base.align_center, { backgroundColor: colors.__x_white, borderColor: colors.__x_black }]}>
                            {
                                gameStatus && playerInfo ?
                                    <>
                                        <TextTag type="textM" style={[base.sans_800, base.pb_3, { color: colors.__x_black }]}>{gameStatus.type === "TIE" ? "The game is tied." : gameStatus.type === "WIN" ? `The game goes to ${gameStatus.player}.` : ''}</TextTag>
                                        <View style={[base.flex_row, base.py_6, base.align_stretch]}>
                                            <View style={[base.flex_fill, base.px_3, base.align_end]}>
                                                <View style={[base.align_center]}>
                                                    <TextTag type="textSm" style={[base.sans_400, base.pb_3, { color: colors.__x_grey }]}>{playerInfo["1"].name}</TextTag>
                                                    <TextTag type="displayM" style={[base.serif_800, { color: colors.__x_black }]}>{playerInfo["1"].score}</TextTag>
                                                </View>
                                            </View>
                                            <View style={[base.px_3, base.justify_center]}>
                                                <TextTag type="displayM" style={[base.serif_800, base.pb_4, { color: colors.__x_black }]}>:</TextTag>
                                            </View>
                                            <View style={[base.flex_fill, base.px_3, base.align_start]}>
                                                <View style={[base.align_center]}>
                                                    <TextTag type="textSm" style={[base.sans_400, base.pb_3, { color: colors.__x_grey }]}>{playerInfo["2"].name}</TextTag>
                                                    <TextTag type="displayM" style={[base.serif_800, { color: colors.__x_black }]}>{playerInfo["2"].score}</TextTag>
                                                </View>
                                            </View>
                                        </View>
                                    </>
                                    : null
                            }
                            <PrimaryButton type="md" text="Next game" onClick={closeModal} />
                            {/* <View style={[base.p_2, styles.closeWrap, base.position_absolute]}>
                                <TouchableOpacity style={[base.display_flex]} activeOpacity={0.6}>
                                    <View style={[base.display_flex, base.align_center, base.justify_center, styles.close, {backgroundColor: colors.__x_white, borderColor: colors.__x_black}]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <Path fillRule="evenodd" clipRule="evenodd" d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L12 10.1144L21.7239 0.390524C22.2446 -0.130175 23.0888 -0.130175 23.6095 0.390524C24.1302 0.911223 24.1302 1.75544 23.6095 2.27614L13.8856 12L23.6095 21.7239C24.1302 22.2446 24.1302 23.0888 23.6095 23.6095C23.0888 24.1302 22.2446 24.1302 21.7239 23.6095L12 13.8856L2.27614 23.6095C1.75544 24.1302 0.911223 24.1302 0.390524 23.6095C-0.130175 23.0888 -0.130175 22.2446 0.390524 21.7239L10.1144 12L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z" fill={colors.__x_black}/>
                                        </Svg>
                                    </View>
                                </TouchableOpacity>
                            </View> */}
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
});

export default ScoreModal;