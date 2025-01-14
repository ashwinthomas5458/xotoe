import React, { useEffect, useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import { useVector } from "react-native-redash";
import Animated, { runOnJS, useAnimatedProps, withDelay, withTiming } from "react-native-reanimated";

import { base, size } from "../styles";
import { colors } from "../config";
import useAppFlags from "../context/useFlagsContext";

import { DefeatModal, PlayerInputModal, ScoreModal, SuccessModal, TieModal } from "../components/modals";
import { PrimaryButton } from "../components/cta";
import Avatar from "../components/avatar";
import { TextTag } from "../components/textTags";
import XoCell from "../components/cell";

const GridIllustration = require("../assets/images/grid.png");
const COLOR_MAP = { "white": colors.__x_white, "yellow": colors.__x_yellow, "blue": colors.__x_blue, "green": colors.__x_green, "orange": colors.__x_orange, "red": colors.__x_red, "grey": colors.__x_grey, "purple": colors.__x_purple };
const LEVEL_WINGS = {"1234": true, "4561": true};
/*-------
Player Info:
name, icon, playing, score, nextPlayerIndex
-------*/
const MAX_GAME_NUMBER= 6;

const Game = ({ route, navigation }) => {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [playerMode, setPlayerMode] = useState("SINGLE"); /* SINGLE, MULTI */
    const [playersInfo, setPlayersInfo] = useState(null);
    const [isNotForeseeing, setIsNotForeseeing] = useState(false);
    const [gameNumber, setGameNumber] = useState(1);
    const [level, setLevel] = useState("BASE");
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
    const [winnerStatus, setWinnerStatus] = useState(null);
    const [winner, setWinner] = useState("");
    const { windowSize } = useAppFlags();
    const tileStart = useVector(0, 0);
    const tileEnd = useVector(0, 0);

    const screenSizes = useMemo(()=>{
        let availableWidth = windowSize.width - (2* size.pagePadding);
        let cellSize = availableWidth/3;
        return { availableWidth, cellSize }
    },[windowSize]);

    const AnimatedPath = Animated.createAnimatedComponent(Path)

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

    const gameTilePositions=[
        {start:{x:0,y:(screenSizes.cellSize/2)}, end:{x:screenSizes.availableWidth,y:(screenSizes.cellSize/2)}},
        {start:{x:0,y:((3*screenSizes.cellSize)/2)}, end:{x:screenSizes.availableWidth,y:((3*screenSizes.cellSize)/2)}},
        {start:{x:0,y:((5*screenSizes.cellSize)/2)}, end:{x:screenSizes.availableWidth,y:((5*screenSizes.cellSize)/2)}},
        {start:{x:(screenSizes.cellSize/2),y:0}, end:{x:(screenSizes.cellSize/2),y:screenSizes.availableWidth}},
        {start:{x:((3*screenSizes.cellSize)/2),y:0}, end:{x:((3*screenSizes.cellSize)/2),y:screenSizes.availableWidth}},
        {start:{x:((5*screenSizes.cellSize)/2),y:0}, end:{x:((5*screenSizes.cellSize)/2),y:screenSizes.availableWidth}},
        {start:{x:0,y:0}, end:{x:screenSizes.availableWidth,y:screenSizes.availableWidth}},
        {start:{x:0,y:screenSizes.availableWidth}, end:{x:screenSizes.availableWidth,y:0}}
    ]

    const handleWinnerData=(gameData)=>{
        let winner = {...gameData.data};
        setWinnerStatus(null);
        hanleGameComplete(winner);
    }

    const handleGameWin=()=>{
        let gameData = {...winnerStatus};
        const currentCombo = gameTilePositions[gameData.combo];
        tileStart.x.value = currentCombo.start.x;
        tileStart.y.value = currentCombo.start.y
        tileEnd.x.value = currentCombo.start.x;
        tileEnd.y.value = currentCombo.start.y;
        tileEnd.x.value = withDelay(400, withTiming(currentCombo.end.x, {duration: 600}));
        tileEnd.y.value = withDelay(400, withTiming(currentCombo.end.y, {duration: 600}, (isFinished)=>{if(isFinished){runOnJS(handleWinnerData)(gameData)}}))
    }

    const checkForWin = (board) => {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { winner: board[a], combo: i };
            }
        }
        return {winner: null, combo: null};
    };

    const isBoardFull = (board) => {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") return false;
        }
        return true;
    };

    const checkPlayerNextMoveScore=(board)=>{
        let bestScore = Infinity;
        let hasWon = false;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                let newBoard = board.slice();
                newBoard[i] = playersInfo["1"].playing;
                let score= 4;
                const  { winner } = checkForWin(newBoard);
                if (winner !== null){
                    score= winner === playersInfo["1"].playing && hasWon ? 2:winner === playersInfo["1"].playing?3  : 4;
                    hasWon = true;
                }
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }

    const minimax = (board, depth, isMaximizing) => {
        const  { winner } = checkForWin(board);
        if (winner !== null) return winner === playersInfo["2"].playing ? 10 - depth : depth - 10;
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

    const getNextMove=(board)=>{
        let bestScore = 1;
        let bestMoves = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                let newBoard = board.slice();
                newBoard[i] = playersInfo["2"].playing;
                const  { winner } = checkForWin(newBoard);
                let score = 1;
                if (winner !== null) score= winner === playersInfo["2"].playing ? 5 : 2;
                else if (isBoardFull(newBoard)) score= 1;
                else score = checkPlayerNextMoveScore(newBoard);
                console.log("score: ", score, i);
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMoves = [i];
                }
                else if (score===bestScore) {
                    bestMoves.push(i);
                }
            }
        }
        console.log("Bestmoves: ", bestMoves);
        const bestMove = getRandomBestMove(bestMoves);
        return bestMove;
    }

    const runXotoeBot=(nextPlayer, newBoard )=>{
        let xotoe = { ...playersInfo[nextPlayer] };
        let bestMove;
        if(isNotForeseeing || level==="WINGS") bestMove = getNextMove(newBoard);
        else bestMove = getBestMove(newBoard);
        newBoard[bestMove] = xotoe.playing;
        const { winner, combo } = checkForWin(newBoard);
        if (winner) setWinnerStatus({data: {type:"WIN", index: nextPlayer, player: "Xotoe", score: xotoe.score}, combo});
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
            const { winner, combo} = checkForWin(newBoard);
            let isTie;
            if(!winner) isTie= isBoardFull(newBoard);
            if(!winner && !isTie){
                let nextPlayer = currentPlayerInfo.nextPlayerIndex;
                setCurrentPlayerIndex(nextPlayer);
                if (playerMode === "SINGLE") setTriggerXotoe({newBoard, nextPlayer});
                else setPlayLoading(false);
            }
            else if (winner)  setWinnerStatus({data: {type:"WIN",index:currentPlayerIndex, player: currentPlayerInfo.name, score: currentPlayerInfo.score}, combo});
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

    const updatePlayerInfo = (info, code) => {
        let players = { ...info };
        let isNotForeseeing = Math.floor((Math.random()*2)); 
        let xc = COLOR_MAP[info["1"].icon];
        let oc = COLOR_MAP[info["2"].icon];
        if(LEVEL_WINGS[code]) setLevel("WINGS");
        setIsNotForeseeing(isNotForeseeing);
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
        let isNotForeseeing = false;
        if(nextGame<=(MAX_GAME_NUMBER/2)) isNotForeseeing = Math.floor((Math.random()*2)); 
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
        setIsNotForeseeing(isNotForeseeing);
        setGameNumber(nextGame);
        tileStart.x.value = 0;
        tileStart.y.value = 0;
        tileEnd.x.value = 0;
        tileEnd.y.value = 0;
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

    const pathAnime = useAnimatedProps(()=>{

        return{
            d: [
                `M ${tileStart.x.value} ${tileStart.y.value}`,
                `L ${tileEnd.x.value} ${tileEnd.y.value}`
            ].join("")
        }
    })

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
        if(winnerStatus) handleGameWin();
    },[winnerStatus]);

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
                        <Image source={GridIllustration} style={[styles.gridImage, base.position_absolute, {width: screenSizes.availableWidth, height: screenSizes.availableWidth}]} />
                        {
                            board && board.map((cell, i) => {
                                return (
                                    <XoCell key={`cell-${i}`} cell={cell} i={i} cellSize={screenSizes.cellSize} handleCellPress={handleCellPress} xc={xcolor} oc={oColor} handleAnimeCallBack={handleAnimeCallBack}/>
                                )
                            })
                        }
                        <View style={[base.position_absolute, styles.gameStatusWrap, {width: screenSizes.availableWidth, height: screenSizes.availableWidth}]} pointerEvents="none">
                            <Svg width={screenSizes.availableWidth} height={screenSizes.availableWidth} viewBox={`0 0 ${screenSizes.availableWidth} ${screenSizes.availableWidth}`}>
                                <AnimatedPath animatedProps={pathAnime} stroke={colors.__x_red} strokeWidth={6}/>
                            </Svg>
                        </View>
                    </View>
                    <View style={[base.pb_4, base.pt_8, base.align_center]}>
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
    gameStatusWrap: {
        top: 0,
        left: 0
    }
});

export default Game;