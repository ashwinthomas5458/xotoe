import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Path, Svg } from "react-native-svg";

import { base, size } from "../styles";
import { colors } from "../config";

import { DefeatModal, PlayerInputModal, ScoreModal, SuccessModal, TieModal } from "../components/modals";
import { PrimaryButton } from "../components/cta";
import Avatar from "../components/avatar";
import { TextTag } from "../components/textTags";

const GridIllustration = require("../assets/images/grid.png");
const COLOR_MAP = { "white": colors.__x_white, "yellow": colors.__x_yellow, "blue": colors.__x_blue, "green": colors.__x_green, "orange": colors.__x_orange, "red": colors.__x_red, "grey": colors.__x_grey, "purple": colors.__x_purple };
/*-------
Player Info:
name, icon, playing, score, nextPlayerIndex
-------*/
const MAX_GAME_NUMBER= 6;
const CELL_SIZE = size.availableWidth / 3;

const XCELL = ({ xc }) => {
    return (
        <Svg style={[base.position_absolute, styles.cellIcon]} width="56" height="56" viewBox="0 0 56 56" fill="none">
            <Path d="M20.1723 8.97906C19.0925 7.52683 17.3995 6.67065 15.5997 6.67065H7.45269C4.82554 6.67065 3.39705 9.74267 5.03334 11.7885L18.4881 28.6111L5.61187 44.8455C3.98754 46.8934 5.41797 49.9534 8.03918 49.9534H16.1861C18.0036 49.9534 19.7111 49.0803 20.7888 47.6042L28.1237 37.557L35.4587 47.6042C36.5363 49.0803 38.2438 49.9534 40.0613 49.9534H48.1314C50.7526 49.9534 52.183 46.8934 50.5587 44.8455L37.6825 28.6111L51.1372 11.7885C52.7735 9.74268 51.345 6.67065 48.7179 6.67065H40.6477C38.848 6.67065 37.155 7.52683 36.0751 8.97906L28.1237 19.6726L20.1723 8.97906Z" fill={colors.__x_black} stroke={colors.__x_black} />
            <Path d="M17.6684 6.47508C16.5886 5.02284 14.8955 4.16666 13.0958 4.16666H4.94877C2.32162 4.16666 0.893126 7.23869 2.52942 9.28456L15.9841 26.1071L3.10795 42.3415C1.48362 44.3895 2.91405 47.4494 5.53525 47.4494H13.6822C15.4997 47.4494 17.2072 46.5763 18.2849 45.1002L25.6198 35.053L32.9547 45.1002C34.0324 46.5763 35.7399 47.4494 37.5574 47.4494H45.6274C48.2486 47.4494 49.6791 44.3895 48.0548 42.3415L35.1786 26.1071L48.6333 9.28456C50.2696 7.23869 48.8411 4.16666 46.2139 4.16666H38.1438C36.3441 4.16666 34.651 5.02284 33.5712 6.47507L25.6198 17.1686L17.6684 6.47508Z" fill={xc} stroke={colors.__x_black} />
        </Svg>
    )
}
const OCell = ({ oc }) => {
    return (
        <Svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <Path fillRule="evenodd" clipRule="evenodd" d="M44.0426 11.7494C44.6289 12.2549 45.1885 12.7908 45.7214 13.357C47.8303 15.5977 49.4504 18.1237 50.576 20.9309C51.7458 23.6996 52.3333 26.5627 52.3333 29.513C52.3333 32.5485 51.7233 35.4586 50.5048 38.2346C49.3314 41.0062 47.6406 43.4926 45.4414 45.691C43.2775 47.8556 40.7132 49.5812 37.7592 50.8707L37.7479 50.8756C34.7647 52.1344 31.482 52.756 27.9137 52.756C24.2996 52.756 20.991 52.1128 18.0034 50.8086L17.9923 50.8037C15.0388 49.4715 12.476 47.7034 10.314 45.4973L10.3069 45.49L10.3 45.4827C10.0126 45.1772 9.73377 44.8669 9.46368 44.5516C8.94239 44.1036 8.44088 43.6339 7.95926 43.1425L7.95218 43.1353L7.94525 43.1279C5.83913 40.8901 4.19861 38.3881 3.02974 35.6249L3.02599 35.616L3.02241 35.6071C1.89752 32.7983 1.33334 29.897 1.33334 26.9097C1.33334 23.8326 1.94346 20.8995 3.16456 18.1198C4.37957 15.3539 6.06802 12.8898 8.225 10.732C10.4327 8.52523 13.0221 6.79678 15.9834 5.54714L15.9884 5.54506C19.0101 4.28895 22.2904 3.66666 25.8177 3.66666C29.4339 3.66666 32.7446 4.33145 35.7335 5.67869C38.6953 6.97242 41.2436 8.74635 43.3666 11.0022C43.5978 11.2478 43.8232 11.4969 44.0426 11.7494ZM38.1823 8.07477C37.2816 7.52427 36.3301 7.03026 35.3279 6.59274C32.4813 5.30869 29.3112 4.66666 25.8177 4.66666C22.4104 4.66666 19.2619 5.26727 16.3722 6.46847C13.5256 7.66968 11.0456 9.32652 8.93224 11.439C6.862 13.51 5.24463 15.871 4.08012 18.522C2.9156 21.1729 2.33334 23.9688 2.33334 26.9097C2.33334 29.7677 2.87247 32.5429 3.95073 35.2353C4.40627 36.3122 4.93655 37.3481 5.54157 38.343C5.4883 38.2224 5.43595 38.1013 5.38451 37.9797L5.38075 37.9708L5.37717 37.9619C4.25229 35.1531 3.68811 32.2518 3.68811 29.2645C3.68811 26.1874 4.29823 23.2543 5.51933 20.4746C6.73434 17.7087 8.42308 15.2443 10.5801 13.0865C12.7878 10.8797 15.3768 9.15157 18.3382 7.90193L18.3431 7.89986C21.3649 6.64376 24.6452 6.02145 28.1724 6.02145C31.7886 6.02145 35.0993 6.68624 38.0883 8.03348C38.1197 8.04719 38.151 8.06095 38.1823 8.07477ZM20.4489 36.2596C19.8704 35.3961 19.4208 34.4576 19.0996 33.441C18.6986 32.1301 18.4977 30.7805 18.4977 29.3888C18.4977 28.033 18.6786 26.72 19.0392 25.4469C19.4359 24.1553 20.025 23.0304 20.8014 22.0611L20.8071 22.0539L20.8127 22.0467C21.5813 21.0502 22.5416 20.2546 23.7056 19.6574C24.877 19.078 26.2913 18.7702 27.9784 18.7702C29.6297 18.7702 31.0337 19.0601 32.215 19.609C32.5767 19.7771 32.9177 19.9647 33.2383 20.1718C33.8067 20.9997 34.2502 21.9155 34.5683 22.9235C34.9677 24.1892 35.1689 25.5165 35.1689 26.9097C35.1689 28.2586 34.9685 29.589 34.5658 30.9039L34.5628 30.9137L34.56 30.9236C34.2055 32.1718 33.6349 33.3258 32.8434 34.39L32.8392 34.3957C32.1215 35.3751 31.1717 36.1653 29.9669 36.7625C28.7944 37.3437 27.3782 37.6525 25.6883 37.6525C23.9981 37.6525 22.5792 37.3641 21.4042 36.8217C21.0687 36.649 20.7504 36.4617 20.4489 36.2596ZM22.2274 38.1942C23.2644 38.4998 24.418 38.6525 25.6883 38.6525C27.4998 38.6525 29.074 38.3212 30.411 37.6584C31.7481 36.9957 32.8263 36.1051 33.6458 34.9868C34.5084 33.827 35.1338 32.5637 35.522 31.1968C35.9533 29.7885 36.1689 28.3594 36.1689 26.9097C36.1689 25.4185 35.9533 23.9895 35.522 22.6226C35.4828 22.4986 35.4419 22.3757 35.3992 22.2541C36.0614 23.1523 36.5697 24.1584 36.9231 25.2783C37.3224 26.544 37.5237 27.8713 37.5237 29.2645C37.5237 30.6134 37.3233 31.9438 36.9206 33.2587L36.9176 33.2685L36.9148 33.2784C36.5603 34.5266 35.9897 35.6806 35.1982 36.7448L35.1939 36.7505C34.4763 37.7299 33.5264 38.5201 32.3217 39.1172C31.1491 39.6985 29.7329 40.0073 28.0431 40.0073C26.3529 40.0073 24.934 39.7189 23.759 39.1765C23.2016 38.8897 22.6916 38.5622 22.2274 38.1942Z" fill={colors.__x_black} />
            <Path fillRule="evenodd" clipRule="evenodd" d="M16.0487 47.5373C18.8953 48.7799 22.0654 49.4013 25.5589 49.4013C29.0093 49.4013 32.1578 48.8007 35.0044 47.5994C37.851 46.3568 40.3094 44.7 42.3796 42.6289C44.493 40.5165 46.1104 38.1348 47.2318 35.4838C48.3963 32.8329 48.9785 30.0577 48.9785 27.1582C48.9785 24.3416 48.4178 21.6078 47.2965 18.9569C46.2182 16.2645 44.6655 13.8414 42.6384 11.6875C40.6113 9.53362 38.1744 7.83536 35.3279 6.59274C32.4813 5.30869 29.3112 4.66666 25.8177 4.66666C22.4104 4.66666 19.2619 5.26727 16.3722 6.46847C13.5256 7.66968 11.0456 9.32652 8.93224 11.439C6.862 13.51 5.24463 15.871 4.08012 18.522C2.9156 21.1729 2.33334 23.9688 2.33334 26.9097C2.33334 29.7677 2.87247 32.5429 3.95073 35.2353C5.07211 37.8862 6.64636 40.2887 8.67346 42.4425C10.7437 44.555 13.2021 46.2533 16.0487 47.5373ZM15.7899 31.3832C15.3586 29.9748 15.143 28.5251 15.143 27.034C15.143 25.5842 15.3371 24.1759 15.7252 22.809C16.1565 21.4007 16.8035 20.1581 17.6661 19.0811C18.5287 17.9628 19.6069 17.0722 20.9008 16.4095C22.2379 15.7468 23.8121 15.4154 25.6236 15.4154C27.3919 15.4154 28.9446 15.7261 30.2816 16.3474C31.6187 16.9687 32.7185 17.8385 33.5811 18.9569C34.4437 20.0338 35.0907 21.2557 35.522 22.6226C35.9533 23.9895 36.1689 25.4185 36.1689 26.9097C36.1689 28.3594 35.9533 29.7885 35.522 31.1968C35.1338 32.5637 34.5084 33.827 33.6458 34.9868C32.8263 36.1051 31.7481 36.9957 30.411 37.6584C29.074 38.3212 27.4998 38.6525 25.6883 38.6525C23.8768 38.6525 22.3026 38.3419 20.9656 37.7206C19.6716 37.0578 18.5934 36.188 17.7308 35.111C16.8682 33.9927 16.2212 32.75 15.7899 31.3832Z" fill={oc} />
        </Svg>

    )
}

const XoCell = ({ cell, i, handleCellPress, xc, oc, handleAnimeCallBack }) => {
    const cellAnime = useRef(new Animated.Value(0)).current;

    const onClick = () => {
        handleCellPress(i);
    }

    const handleAnime = () => {
        Animated.timing(cellAnime, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start(handleAnimeCallBack);
    }

    useEffect(() => {
        if (cell) handleAnime();
    }, [cell]);

    return (
        <View style={[styles.cell, base.p_2, base.display_flex, base.align_stretch]}>
            <TouchableOpacity style={[base.flex_fill, base.display_flex, base.align_center, base.justify_center]} activeOpacity={0.6} onPress={onClick}>
                <Animated.View style={[base.position_relative, styles.cellIndicator, { opacity: cellAnime }]}>
                    {
                        cell === "X" ? <XCELL xc={xc} />
                            : cell === "O" ? <OCell oc={oc} />
                                : null
                    }
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}

const Game = ({ route, navigation }) => {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [playerMode, setPlayerMode] = useState("SINGLE"); /* SINGLE, MULTI */
    const [playersInfo, setPlayersInfo] = useState(null);
    const [gameNumber, setGameNumber] = useState(1);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState("1");
    const [triggerPlayerModal, setTriggerPlayerModal] = useState(false);
    const [xcolor, setXcolor] = useState("#FFFFFF");
    const [oColor, setOcolor] = useState("#FFFFFF");
    const [playLoading, setPlayLoading] = useState(false);
    const [triggerXotoe, setTriggerXotoe] = useState(null);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [gameStatus, setGameStatus] = useState(null);
    const [triggerScoreModal, setTriggerScoreModal] = useState(false);
    const [triggerSuccessModal, setTriggerSuccessModal] = useState(false);
    const [triggerTieModal, setTriggerTieModal] = useState(false);
    const [triggerDefeatModal, setTriggerDefeatModal] = useState(false);
    const [winner, setWinner] = useState("");

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkForWin = (board) => {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const isBoardFull = (board) => {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") return false;
        }
        return true;
    };

    const minimax = (board, depth, isMaximizing) => {
        let result = checkForWin(board);
        if (result !== null) return result === playersInfo["2"].playing ? 10 - depth : depth - 10;
        if (isBoardFull(board)) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    let newBoard = board.slice();
                    newBoard[i] = playersInfo["2"].playing;
                    let score = minimax(newBoard, depth + 1, false);
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    let newBoard = board.slice();
                    newBoard[i] = playersInfo["1"].playing;;
                    let score = minimax(newBoard, depth + 1, true);
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const getRandomBestMove=(bestMoves)=>{
        const optionsLength = bestMoves.length;
        const randomIndex = Math.floor(Math.random() * optionsLength);
        return bestMoves[randomIndex];
    }

    const getBestMove = (board) => {
        let bestScore = -Infinity;
        let bestMoves = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                let newBoard = board.slice();
                newBoard[i] = playersInfo["2"].playing;
                const score = minimax(newBoard, 0, false);
                if (score > bestScore) {
                    bestScore = score;
                    bestMoves = [i];
                }
                else if (score===bestScore) {
                    bestMoves.push(i);
                }
            }
        }
        const bestMove = getRandomBestMove(bestMoves);
        return bestMove;
    };

    const runXotoeBot=(nextPlayer, newBoard )=>{
        let xotoe = { ...playersInfo[nextPlayer] };
        let bestMove = getBestMove(newBoard);
        newBoard[bestMove] = xotoe.playing;
        let winner = checkForWin(newBoard);
        if (winner) hanleGameComplete({type:"WIN", index: nextPlayer, player: "Xotoe", score: xotoe.score});
        else if (isBoardFull(newBoard)) hanleGameComplete({type:"TIE"});
        else {
            nextPlayer = xotoe.nextPlayerIndex;
            setCurrentPlayerIndex(nextPlayer);
            setTriggerXotoe(false);
            setPlayLoading(false);
        }
        setBoard(newBoard);
    }

    const handleCellPress = (index) => {
        if (playersInfo && !playLoading && board[index]==="") {
            setIsAnimationComplete(false);
            setPlayLoading(true);
            let newBoard = board.slice();
            let currentPlayerInfo = { ...playersInfo[currentPlayerIndex] };
            newBoard[index] = currentPlayerInfo.playing;
            setBoard(newBoard);
            let winner = checkForWin(newBoard);
            let isTie;
            if(!winner) isTie= isBoardFull(newBoard);
            if(!winner && !isTie){
                let nextPlayer = currentPlayerInfo.nextPlayerIndex;
                setCurrentPlayerIndex(nextPlayer);
                if (playerMode === "SINGLE") setTriggerXotoe({newBoard, nextPlayer});
                else setPlayLoading(false);
            }
            else if (winner) hanleGameComplete({type:"WIN",index:currentPlayerIndex, player: currentPlayerInfo.name, score: currentPlayerInfo.score});
            else if (isTie) hanleGameComplete({type:"TIE"});
        }
    };

    const handleAnimeCallBack=()=>{
        setIsAnimationComplete(true);
    }

    const intializeGameByXotoe=()=>{
        let newBoard = ["", "", "", "", "", "", "", "", ""];
        let xi = Math.floor(Math.random() * 9);
        newBoard[xi] = "X";
        setBoard(newBoard);
        setCurrentPlayerIndex("1");
    }

    const getPlayerDetails = () => {
        setTriggerPlayerModal(true);
    }

    const closePlayerModal = () => {
        setTriggerPlayerModal(false);
        navigation.goBack();
    }

    const closeStatusModal = () => {
        setTriggerSuccessModal(false);
        setTriggerTieModal(false);
        setTriggerDefeatModal(false);
        navigation.goBack();
    }

    const closeScoreModal=()=>{
        let xc = oColor;
        let oc = xcolor;
        setXcolor(xc);
        setOcolor(oc);
        setPlayLoading(false);
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setGameStatus(null);
        if(playerMode==="SINGLE" && playersInfo["2"].playing==="X") intializeGameByXotoe();
        setTriggerScoreModal(false);
    }

    const updatePlayerInfo = (info) => {
        let players = { ...info };
        let xc = COLOR_MAP[info["1"].icon];
        let oc = COLOR_MAP[info["2"].icon];
        setXcolor(xc);
        setOcolor(oc);
        setPlayersInfo(players);
        setTriggerPlayerModal(false);
    }

    const checkGameMode = () => {
        if (route.params.playerMode) {
            setPlayerMode(route.params.playerMode);
            getPlayerDetails();
        }
    }

    const handleNextGame=(game, info)=>{
        console.log("NEXT: ")
        const nextGame = game+1;
        let players = {...playersInfo};
        if(info.type==="WIN") players[info.index].score = info.score+1;
        if(playersInfo["1"].playing==="X"){
            players["1"].playing="O";
            players["2"].playing="X";
        }
        else{
            players["1"].playing="X";
            players["2"].playing="O";
        }
        let currentIndex = nextGame%2===0? "2":"1";
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setCurrentPlayerIndex(currentIndex);
        setPlayersInfo({...players});
        setGameNumber(nextGame);
    }

    const checkFinalScore=(info)=>{
        let winner = "";
        let isTie = false;
        let players = {...playersInfo};
        if(info.type==="WIN") players[info.index].score = info.score+1; 

        if(players["1"].score===players["2"].score) isTie = true;
        else if(players["1"].score>players["2"].score) winner = players["1"].name;
        else if(players["1"].score<players["2"].score) winner = players["2"].name;

        if(isTie) setTriggerTieModal(true);
        else if(winner==="Xotoe") setTriggerDefeatModal(true);
        else {
            setWinner(winner);
            setTriggerSuccessModal(true);
        }
        setPlayersInfo({...players});
    }

    const hanleGameComplete = (info) => {
        if(gameNumber!=MAX_GAME_NUMBER){
            setGameStatus(info);
            setTriggerScoreModal(true);
            handleNextGame(gameNumber, info);
        }
        else checkFinalScore(info);
    }

    const rebootGame=()=>{
        let players = {...playersInfo};
        players["1"].playing="X";
        players["2"].playing="O";
        players["1"].score=0;
        players["2"].score=0;
        let xc = oColor;
        let oc = xcolor;
        setGameNumber(1);
        setCurrentPlayerIndex("1");
        setPlayLoading(false);
        setTriggerXotoe(null);
        setIsAnimationComplete(false);
        setGameStatus(null);
        setPlayersInfo({...players});
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setXcolor(xc);
        setOcolor(oc);
        setTriggerSuccessModal(false);
        setTriggerTieModal(false);
        setTriggerDefeatModal(false);
        setWinner("")
    }

    useEffect(()=>{
        console.log("callback: ", triggerXotoe, isAnimationComplete);
        if(triggerXotoe && isAnimationComplete){
            const {newBoard, nextPlayer} = triggerXotoe;
            runXotoeBot(nextPlayer, [...newBoard]);
        }
    },[isAnimationComplete, triggerXotoe]);

    useEffect(() => {
        if (route.params) checkGameMode();
    }, [route]);

    return (
        <>
            <ScrollView style={[base.flex_fill, { backgroundColor: colors.__x_white }]} contentContainerStyle={base.flex_grow} keyboardShouldPersistTaps="handled">
                <View style={[base.flex_fill, base.page_h_padding, base.page_v_padding, base.align_stretch]}>
                    <View style={[base.flex_fill, base.pb_6, base.pt_4, base.flex_row, base.align_stretch]}>
                        {
                            playersInfo ?
                                <>
                                    <View style={[base.flex_fill]}>
                                        <View style={[base.align_start]}>
                                            <Avatar type={playersInfo["1"].icon} />
                                            <TextTag type="textM" style={[base.serif_800, base.pb_1, {color: colors.__x_black}]}>{playersInfo["1"].name}: {playersInfo["1"].score}/{MAX_GAME_NUMBER}</TextTag>
                                            <TextTag type="textXs" style={[base.sans_400, {color: colors.__x_grey}]}>Playing {playersInfo["1"].playing}</TextTag>
                                        </View>
                                    </View>
                                    <View style={[base.flex_fill, base.align_center, base.pt_1, base.px_4]}>
                                        <TextTag type="textLg" style={[base.serif_800, {color: colors.__x_black}]}>Game {gameNumber}/{MAX_GAME_NUMBER}</TextTag>
                                    </View>
                                    <View style={[base.flex_fill]}>
                                        <View style={[base.align_end]}>
                                            <Avatar type={playersInfo["2"].icon} />
                                            <TextTag type="textM" style={[base.serif_800, {color: colors.__x_black}]}>{playersInfo["2"].name}: {playersInfo["2"].score}/{MAX_GAME_NUMBER}</TextTag>
                                            <TextTag type="textXs" style={[base.sans_400, {color: colors.__x_grey}]}>Playing {playersInfo["2"].playing}</TextTag>
                                        </View>
                                    </View>
                                </>
                                : null
                        }
                    </View>
                    <View style={[base.position_relative, base.flex_row, base.flex_wrap]}>
                        <Image source={GridIllustration} style={[styles.gridImage, base.w_100, base.h_100, base.position_absolute]} />
                        {
                            board && board.map((cell, i) => {
                                return (
                                    <XoCell key={`cell-${i}`} cell={cell} i={i} handleCellPress={handleCellPress} xc={xcolor} oc={oColor} handleAnimeCallBack={handleAnimeCallBack}/>
                                )
                            })
                        }
                    </View>
                    <View style={[base.pb_4, base.pt_6, base.align_center]}>
                        <PrimaryButton text="Abort" onClick={closePlayerModal} />
                    </View>
                </View>
            </ScrollView>
            <SuccessModal showModal={triggerSuccessModal} closeModal={closeStatusModal} handleGameReboot={rebootGame} playerMode={playerMode} player={winner}/>
            <TieModal showModal={triggerTieModal} closeModal={closeStatusModal} handleGameReboot={rebootGame}/>
            <DefeatModal showModal={triggerDefeatModal} closeModal={closeStatusModal} handleGameReboot={rebootGame}/>
            <ScoreModal showModal={triggerScoreModal} closeModal={closeScoreModal} gameStatus={gameStatus} playerInfo={playersInfo}/>
            <PlayerInputModal showModal={triggerPlayerModal} closeModal={closePlayerModal} playerMode={playerMode} updatePlayerInfo={updatePlayerInfo} />
        </>
    )
}

const styles = StyleSheet.create({
    gridImage: {
        top: 0,
        left: 0
    },
    cell: {
        width: CELL_SIZE,
        height: CELL_SIZE,
    },
    cellIndicator: {
        width: 56,
        height: 56
    },
    cellIcon: {
        top: 0,
        left: 0
    }
});

export default Game;