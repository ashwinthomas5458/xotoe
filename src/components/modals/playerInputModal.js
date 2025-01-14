import React, { useEffect, useState } from "react";
import { Modal, View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { base, size } from "../../styles";
import { CONFIG, colors } from "../../config";
import { TextTag } from "../textTags";
import { PrimaryButton } from "../cta";
import { InputBox } from "../input";
import Avatar from "../avatar";
import useAppFlags from "../../context/useFlagsContext";

const MODAL_WIDTH = 360;
const MAX_WIDTH = size.width-48;
const MODAL_X_PADDING = 24;
const X_NAME_MAP = {"white":"White","yellow":"Yellow","blue":"Blue","green":"Green","orange":"Orange","red":"Red","grey":"Grey","purple":"Purple"};
const COLOR_MAP = {"white":"__x_white","yellow":"__x_yellow","blue":"__x_blue","green":"__x_green","orange":"__x_orange","red":"__x_red","grey":"__x_grey","purple":"__x_purple"};

const AvatarWrap=({avatar, isDisabled, i, onAvatarClick, selectedIcon})=>{

    const onClick=()=>{
        if(!isDisabled) onAvatarClick(avatar, i);
    }

    return(
        <View style={[base.p_2, {opacity: isDisabled? 0.5: 1}]}>
            <TouchableOpacity activeOpacity={isDisabled? 1: 0.6} onPress={onClick}>
                <View style={[styles.avatarWrap, {borderColor: selectedIcon&& selectedIcon===avatar? colors.__x_orange: colors.__x_white}]}>
                    <Avatar type={avatar}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const PlayerInputModal = ({
    showModal,
    playerMode,
    closeModal,
    updatePlayerInfo
}) => {
    const [playerInfo, setPlayerInfo] = useState({
        "1": {"name":"","icon":"","playing":"X","score":0,"nextPlayerIndex":"2"},
        "2": {"name":"Xotoe","icon":"","playing":"O","score":0,"nextPlayerIndex":"1"}
    });
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [selectedIconIndex, setSelectedIconIndex] = useState(-1);
    const [code, setCode] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [pageNum, setPageNum] = useState("1");
    const [playerOneAvatar, setPlayerOneAvatar] = useState("none");
    const [error, setError] = useState("");
    const { windowSize } = useAppFlags();

    const handleNameChange=(val)=>{
        setPlayerName(val);
        setError("");
    }

    const handleAvatarClick=(avatar, i)=>{
        let codeUpdate = `${code}${i+1}`;
        setSelectedIcon(avatar);
        setSelectedIconIndex(i);
        setPlayerName(X_NAME_MAP[avatar]);
        setCode(codeUpdate);
    }

    const getRandomIcon=()=>{
        let icon="white";
        let avatarList = [...CONFIG.avatarList];
        avatarList.splice(selectedIconIndex, 1);
        let i = Math.floor(Math.random()*7);
        icon = avatarList[i];
        console.log("ICON:", icon, avatarList, i, selectedIconIndex);
        return icon;
    }

    const handleSingleUserInfo=()=>{
        if(playerName?.length<9 && playerName!="Xotoe"){
            let info = {...playerInfo};
            info["1"].name = playerName;
            info["1"].icon = selectedIcon;
            let x = getRandomIcon();
            info["2"].icon = x;
            updatePlayerInfo(info);
        }
        else if(playerName==="Xotoe") setError("Oops, that nickname is already taken. Try another one.");
        else setError("Its a nickname bro, keep it below 8 characters");
    }

    const handlePlayerOneInfo=()=>{
        if(playerName?.length<9 && playerName!="Xotoe"){
            let info = {...playerInfo};
            let x_avatar = selectedIcon;
            info["1"].name = playerName;
            info["1"].icon = x_avatar;
            setPlayerInfo({...info});
            setPlayerOneAvatar(x_avatar)
            setPlayerName("");
            setSelectedIcon(null);
            setSelectedIconIndex(null);
            setPageNum("2");
        }
        else if(playerName==="Xotoe") setError("Oops, that nickname is already taken. Try another one.");
        else setError("Its a nickname bro, keep it below 8 characters");
    }

    const handlePlayerTwoInfo=()=>{
        if(playerName?.length<9 && playerName!="Xotoe" && playerName!=playerInfo["1"].name){
            let info = {...playerInfo};
            info["2"].name = playerName;
            info["2"].icon = selectedIcon;
            setPlayerInfo({...info});
            updatePlayerInfo(info, code);
        }
        else if(playerName==="Xotoe"|| playerName===playerInfo["1"].name) setError("Oops, that nickname is already taken. Try another one.");
        else setError("Its a nickname bro, keep it below 8 characters");
    }

    const handleSubmit=()=>{
        if(playerMode==="SINGLE") handleSingleUserInfo();
        else if(playerMode==="MULTI"&&pageNum==="1") handlePlayerOneInfo();
        else if(playerMode==="MULTI"&&pageNum==="2") handlePlayerTwoInfo();
    }

    const handleDisabledClick=()=>{

    }

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
                    <TouchableOpacity activeOpacity={0.6} style={[base.position_absolute, styles.modalBackdrop, styles.mainWrapperWidth, base.h_100, {backgroundColor:colors.__modal_bg }]}></TouchableOpacity>
                    <View style={[styles.wrapper, base.position_relative]}>
                        <View style={[base.w_100, base.h_100, base.position_absolute, styles.shadow, {backgroundColor: colors.__x_black}]}></View>
                        <View style={[styles.modalContainer, base.p_6, base.w_100, { backgroundColor: colors.__x_white, borderColor: colors.__x_black }]}>
                            <TextTag type="textM" style={[base.sans_800, base.pb_3, {color: colors.__x_black}]}>Game face alley.</TextTag>
                            <TextTag type="textM" style={[base.sans_400, base.pb_4, {color: colors.__x_black}]}>
                                {
                                    playerMode==="SINGLE"? "Choose your avatar for the game, you can update your nickname(within 8 characters) if you want."
                                    : playerMode==="MULTI" && pageNum==="1"? "Choose your avatar for player 1, you can update your nickname(within 8 characters) if you want."
                                    : playerMode==="MULTI" && pageNum==="2"? "Choose your avatar for player 2, you can update your nickname(within 8 characters) if you want."
                                    : ""
                                }
                            </TextTag>
                            <View style={[base.flex_row, base.flex_wrap, base.py_2]}>
                                {
                                    CONFIG.avatarList.map((avatar, i)=>{
                                        return(
                                            <AvatarWrap key={`avatar-${avatar}-${i}`} i={i} avatar={avatar} onAvatarClick={handleAvatarClick} isDisabled={avatar===playerOneAvatar} selectedIcon={selectedIcon}/>
                                        )
                                    })
                                }
                            </View>
                            <View style={[base.align_stretch, base.py_4]}>
                                <InputBox value={playerName} index={1} id={1} onChange={handleNameChange} placeholder="Nickname"/>
                            </View>
                            {
                                error?.length?
                                <TextTag type="textXs" style={[base.sans_600, base.pb_3, {color: colors.__x_red}]}>{error}</TextTag>
                                : null
                            }
                            <View style={[base.align_end, base.pt_2]}>
                                <PrimaryButton type="md" text={playerMode==="SINGLE"||pageNum==="2"?"Game on": "Next"} onClick={handleSubmit} isDisabled={!selectedIcon||!playerName} onDisabledClick={handleDisabledClick}/>
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
    }
});

export default PlayerInputModal;