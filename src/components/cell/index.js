import React, { useEffect, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import Animated, { interpolate, runOnJS, useAnimatedProps, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

import { base } from "../../styles";
import { colors } from "../../config";

const xStrokeLg = 34*Math.sqrt(2);
const xStrokeSm = 30*Math.sqrt(2);
const oStroke = 30*Math.PI;

const vec2 = (x, y) => {
    "worklet";
    return { x, y };
};
const curve = (c1, c2, to) => {
    "worklet";
    return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

const XCELL = ({ xc, anime1, anime2 }) => {
    const Animatedpath = Animated.createAnimatedComponent(Path);

    const animeX1=useAnimatedProps(()=>{
        const strokeDashoffset = interpolate(
            anime1.value,
            [0, 1],
            [xStrokeLg, 0]
        )

        return{
            d: [`M 8 8`, `L 42 42`].join(""),
            strokeDashoffset: strokeDashoffset
        }
    });
    const animeX2=useAnimatedProps(()=>{
        const strokeDashoffset = interpolate(
            anime1.value,
            [0, 1],
            [xStrokeLg, 0]
        )

        return{
            d: [`M 6 6`, `L 40 40`].join(""),
            strokeDashoffset: strokeDashoffset
        }
    });
    const animeX3=useAnimatedProps(()=>{
        const strokeDashoffset = interpolate(
            anime2.value,
            [0, 1],
            [xStrokeLg, 0]
        )

        return{
            d: [`M 8 42`, `L 42 8`].join(""),
            strokeDashoffset: strokeDashoffset
        }
    });
    const animeX4=useAnimatedProps(()=>{
        const strokeDashoffset = interpolate(
            anime2.value,
            [0, 1],
            [xStrokeLg, 0]
        )

        return{
            d: [`M 6 40`, `L 40 6`].join(""),
            strokeDashoffset: strokeDashoffset
        }
    });
    const animeX5=useAnimatedProps(()=>{
        const strokeDashoffset = interpolate(
            anime1.value,
            [0, 1],
            [xStrokeSm, 0]
        )

        return{
            d: [`M 8 8`, `L 38 38`].join(""),
            strokeDashoffset: strokeDashoffset
        }
    });
    const animeX6=useAnimatedProps(()=>{
        const strokeDashoffset = interpolate(
            anime2.value,
            [0, 1],
            [xStrokeSm, 0]
        )

        return{
            d: [`M 8 38`, `L 38 8`].join(""),
            strokeDashoffset: strokeDashoffset
        }
    });

    return (
        <Svg style={[base.position_absolute, styles.cellIcon]} width="48" height="48" viewBox="0 0 48 48" fill="none">
            <Animatedpath animatedProps={animeX1} stroke={colors.__x_black} strokeWidth={16} strokeDasharray={xStrokeLg}/>
            <Animatedpath animatedProps={animeX2} stroke={colors.__x_black} strokeWidth={16} strokeDasharray={xStrokeLg}/>
            <Animatedpath animatedProps={animeX3} stroke={colors.__x_black} strokeWidth={16} strokeDasharray={xStrokeLg}/>
            <Animatedpath animatedProps={animeX4} stroke={colors.__x_black} strokeWidth={16} strokeDasharray={xStrokeLg}/>
            <Animatedpath animatedProps={animeX5} stroke={xc} strokeWidth={10} strokeDasharray={xStrokeSm}/>
            <Animatedpath animatedProps={animeX6} stroke={xc} strokeWidth={10} strokeDasharray={xStrokeSm}/>
        </Svg>
    )
}
const OCell = ({ oc, anime }) => {
    const radius = 15;
    const curveControl = radius * 0.5522847498;
    const Animatedpath = Animated.createAnimatedComponent(Path);

    const animeX1=useAnimatedProps(()=>{
        const strokeDashoffset = interpolate(
            anime.value,
            [0, 1],
            [oStroke, 0]
        )

        const p1 = vec2(23,8);
        const p2 = vec2(8,23);
        const p3 = vec2(23,38);
        const p4 = vec2(38,23);

        const c11 = vec2(p1.x-curveControl, p1.y);
        const c12 = vec2(p2.x, p2.y-curveControl);

        const c21 = vec2(p2.x, p2.y+curveControl);
        const c22 = vec2(p3.x-curveControl, p3.y);

        const c31 = vec2(p3.x+curveControl, p3.y);
        const c32 = vec2(p4.x, p4.y+curveControl);

        const c41 = vec2(p4.x, p4.y-curveControl);
        const c42 = vec2(p1.x+curveControl, p1.y);

        return{
            d: [`M ${p1.x} ${p1.y}`,curve(c11, c12, p2),curve(c21, c22, p3),curve(c31, c32, p4),curve(c41, c42, p1)].join(""),
            strokeDashoffset: strokeDashoffset
        }
    });
    const animeX2=useAnimatedProps(()=>{
        const strokeDashoffset = interpolate(
            anime.value,
            [0, 1],
            [oStroke, 0]
        )

        const p1 = vec2(25,10);
        const p2 = vec2(10,25);
        const p3 = vec2(25,40);
        const p4 = vec2(40,25);

        const c11 = vec2(p1.x-curveControl, p1.y);
        const c12 = vec2(p2.x, p2.y-curveControl);

        const c21 = vec2(p2.x, p2.y+curveControl);
        const c22 = vec2(p3.x-curveControl, p3.y);

        const c31 = vec2(p3.x+curveControl, p3.y);
        const c32 = vec2(p4.x, p4.y+curveControl);

        const c41 = vec2(p4.x, p4.y-curveControl);
        const c42 = vec2(p1.x+curveControl, p1.y);

        return{
            d: [`M ${p1.x} ${p1.y}`,curve(c11, c12, p2),curve(c21, c22, p3),curve(c31, c32, p4),curve(c41, c42, p1)].join(""),
            strokeDashoffset: strokeDashoffset
        }
    });
    const animeX3=useAnimatedProps(()=>{
        const strokeDashoffset = interpolate(
            anime.value,
            [0, 1],
            [oStroke, 0]
        )

        const p1 = vec2(23,8);
        const p2 = vec2(8,23);
        const p3 = vec2(23,38);
        const p4 = vec2(38,23);

        const c11 = vec2(p1.x-curveControl, p1.y);
        const c12 = vec2(p2.x, p2.y-curveControl);

        const c21 = vec2(p2.x, p2.y+curveControl);
        const c22 = vec2(p3.x-curveControl, p3.y);

        const c31 = vec2(p3.x+curveControl, p3.y);
        const c32 = vec2(p4.x, p4.y+curveControl);

        const c41 = vec2(p4.x, p4.y-curveControl);
        const c42 = vec2(p1.x+curveControl, p1.y);

        return{
            d: [`M ${p1.x} ${p1.y}`,curve(c11, c12, p2),curve(c21, c22, p3),curve(c31, c32, p4),curve(c41, c42, p1)].join(""),
            strokeDashoffset: strokeDashoffset
        }
    });

    return (
        <Svg style={[base.position_absolute, styles.cellIcon]} width="48" height="48" viewBox="0 0 48 48" fill="none">
            <Animatedpath animatedProps={animeX1} stroke={colors.__x_black} strokeWidth={16} strokeDasharray={oStroke}/>
            <Animatedpath animatedProps={animeX2} stroke={colors.__x_black} strokeWidth={16} strokeDasharray={oStroke}/>
            <Animatedpath animatedProps={animeX3} stroke={oc} strokeWidth={10} strokeDasharray={oStroke}/>
        </Svg>
    )
}

const XoCell = ({ cell, i, handleCellPress, xc, oc, handleAnimeCallBack, cellSize }) => {
    const cellAnimeX1 = useSharedValue(0);
    const cellAnimeX2 = useSharedValue(0);
    const cellAnimeO = useSharedValue(0);

    const onClick = () => {
        handleCellPress(i);
    }

    const handleAnime = () => {
        if(cell==="X"){
            cellAnimeX1.value = withTiming(1, {duration: 300});
            cellAnimeX2.value = withDelay(300, withTiming(1, {duration: 300}, (isFinished)=>{if(isFinished){runOnJS(handleAnimeCallBack)()}}));
        }
        else if(cell==="O") cellAnimeO.value = withTiming(1, {duration: 600}, (isFinished)=>{if(isFinished){runOnJS(handleAnimeCallBack)()}});
        else{
            cellAnimeX1.value=0;
            cellAnimeX2.value=0;
            cellAnimeO.value=0;
        }
    }

    const returnCellSvg=()=>{
        return(
            <>
             <XCELL xc={xc} anime1={cellAnimeX1} anime2={cellAnimeX2}/>
             <OCell oc={oc} anime={cellAnimeO}/>
            </>
        )
    }

    const cellSvg = useMemo(returnCellSvg,[cell]);

    useEffect(() => {
        handleAnime();
    }, [cell]);

    return (
        <View style={[base.p_2, base.display_flex, base.align_stretch, {width: cellSize, height: cellSize}]}>
            <TouchableOpacity style={[base.flex_fill, base.display_flex, base.align_center, base.justify_center]} activeOpacity={0.6} onPress={onClick}>
                <Animated.View style={[base.position_relative, styles.cellIndicator]}>
                   {cellSvg}
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cellIndicator: {
        width: 48,
        height: 48
    },
    cellIcon: {
        top: 0,
        left: 0
    }
});

export default XoCell;