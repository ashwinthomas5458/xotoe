import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Platform, UIManager, LayoutAnimation } from "react-native";
import Animated, { Easing, runOnJS, useAnimatedProps, useDerivedValue, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import MaskedView from "@react-native-masked-view/masked-view";
import { Path, Svg } from "react-native-svg";
import { useVector } from "react-native-redash";

import { base, size } from "../styles";
import { colors } from "../config";
import useAppFlags from "../context/useFlagsContext";
import { useStorage } from "../services/hooks";

import { TextTag } from "../components/textTags";
import { RoundedArrowButton } from "../components/cta";
import { PageIndicatorDot } from "../components/indicators";
import { OnboardingSplashDummy } from "../components/splashScreen";

const ONBOARDING_DATA = [
    { "title": "Timeless classic", "description": "Rediscover the magic of the classic tic-tac-toe game as you embark on a journey through its timeless charm!", "background": colors.__x_red, "color": colors.__x_white, "icon": colors.__x_blue, "id": 1, "index": 0 },
    { "title": "Dual Dominance", "description": "Master both X and O roles across 6 games. Play in both places, strategize, and conquer the board.", "background": colors.__x_yellow, "color": colors.__x_black, "icon": colors.__x_green, "id": 2, "index": 1 },
    { "title": "Play Your Way", "description": "With diverse play modes, dive into multiplayer face-offs or challenge Xotoe for a solo gaming thrill.", "background": colors.__x_purple, "color": colors.__x_white, "icon": colors.__x_orange, "id": 3, "index": 2 },
];
const ONBOARDING_INDICATORS = ["1", "2", "3"];
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const vec2 = (x, y) => {
    "worklet";
    return { x, y };
};
const curve = (c1, c2, to) => {
    "worklet";
    return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

const CardMak = ({ children, side, position }) => {
    const AnimatedPath = Animated.createAnimatedComponent(Path);

    const radius = useDerivedValue(() => {
        return Math.min(position.x.value, size.width / 2);
    });

    const pathAnime = useAnimatedProps(() => {
        const stepY = position.x.value;
        const stepX = radius.value / 2; // R/2
        const curveControl = stepY * 0.5522847498;

        const p5 = { x: position.x.value, y: position.y.value }
        const p4 = vec2(p5.x + stepX, p5.y - stepY);
        const p3 = vec2(p4.x + stepX, p4.y - stepY);
        const p2 = vec2(p3.x - stepX, p3.y - stepY);
        const p1 = vec2(p2.x - stepX, p2.y - stepY);

        const c11 = vec2(p1.x, p1.y + curveControl);
        const c12 = vec2(p2.x, p2.y);

        const c21 = vec2(p2.x, p2.y);
        const c22 = vec2(p3.x, p3.y - curveControl);

        const c31 = vec2(p3.x, p3.y + curveControl);
        const c32 = vec2(p4.x, p4.y);

        const c41 = vec2(p4.x, p4.y);
        const c42 = vec2(p5.x, p5.y - curveControl);

        return {
            d: [
                "M 0 0",
                `H ${p1.x}`,
                `V ${p1.y}`,
                curve(c11, c12, p2),
                curve(c21, c22, p3),
                curve(c31, c32, p4),
                curve(c41, c42, p5),
                `V ${size.height}`,
                "H 0",
                "V 0 Z"
            ].join(" "),
        }
    })

    const maskElement = (
        <Svg style={[StyleSheet.absoluteFill, { transform: [{ rotateY: side === "RIGHT" ? "180deg" : "0deg" }] }]}>
            <AnimatedPath animatedProps={pathAnime} fill="#000" />
        </Svg>
    )

    return (
        <MaskedView style={[styles.cardMask, base.align_stretch]} maskElement={maskElement}>{children}</MaskedView>
    )
}

const OnboardingCard = ({ item }) => {
    return (
        <View style={[base.align_stretch, base.flex_fill, { backgroundColor: item.background }]}>
            <View style={[base.flex_fill, base.align_center]}>
                <View style={[styles.cardWrap, base.align_stretch, base.justify_center, base.px_10]}>
                    <View style={[base.flex_fill, base.py_4, base.justify_center]}>
                        <View style={[base.align_center]}>
                            <Svg width="200" height="200" viewBox="0 0 200 200" fill="none" >
                                <Path fillRule="evenodd" clipRule="evenodd" d="M138.614 20.8487C126.238 13.9361 112.01 10 96.8723 10C67.0942 10 40.8338 25.2316 25.2738 48.3907C11.5564 54.6872 2 68.6733 2 84.9332V108.152C2 123.617 10.6471 137.026 23.2905 143.716C32.3361 158.476 45.6023 170.32 61.386 177.514C73.7618 184.426 87.9899 188.362 103.128 188.362C134.211 188.362 161.459 171.768 176.71 146.882C189.353 140.192 198 126.784 198 111.318V88.0994C198 71.8395 188.444 57.8534 174.726 51.5569C165.775 38.2335 153.281 27.5338 138.614 20.8487ZM50.0042 31.6131C42.3113 37.2226 35.6389 44.1768 30.3231 52.1356C30.7214 51.936 31.1234 51.7431 31.5291 51.5569C36.6242 43.9735 42.8666 37.2401 50.0042 31.6131ZM22.8471 57.0088C13.9456 64.3595 8.25532 75.5525 8.25532 88.0994V84.9332C8.25532 73.327 14.0386 63.0881 22.8471 57.0088ZM64.1803 171.842C51.6713 164.802 41.2149 154.477 33.9492 142.018C22.4763 136.677 14.5106 124.939 14.5106 111.318V88.0994C14.5106 73.7955 23.2948 61.5685 35.7002 56.6451C50.0029 34.2903 74.8589 19.4986 103.128 19.4986C114.77 19.4986 125.834 22.0076 135.82 26.5205C147.357 33.0129 157.148 42.3003 164.3 53.4789C176.705 58.4023 185.489 70.6293 185.489 84.9332V108.152C185.489 121.773 177.524 133.511 166.051 138.852C152.085 162.799 126.332 178.864 96.8723 178.864C85.2299 178.864 74.1662 176.355 64.1803 171.842Z" fill={colors.__x_black} />
                                <Path d="M164.3 53.479C176.706 58.4024 185.49 70.6294 185.49 84.9333V108.152C185.49 121.773 177.524 133.511 166.051 138.852C152.086 162.799 126.333 178.864 96.8729 178.864C67.4132 178.864 41.6599 162.799 27.6945 138.852C16.2216 133.511 8.25586 121.773 8.25586 108.152V84.9333C8.25586 70.6294 17.0401 58.4024 29.4454 53.479C43.7482 31.1242 68.6041 16.3325 96.8729 16.3325C125.142 16.3325 149.998 31.1242 164.3 53.479Z" fill={item.icon} />
                                <Path d="M177.149 97.5977C177.149 103.731 176.478 109.706 175.206 115.451C161.435 141.933 131.769 166.199 97.3936 166.199C61.4834 166.199 30.7132 139.719 17.8338 111.894C17.0202 107.253 16.5957 102.475 16.5957 97.5977C16.5957 84.7774 19.5283 72.6504 24.7514 61.8668C26.3462 58.5743 28.9652 55.8832 32.2808 54.4065C48.0529 47.3821 71.3739 45.8833 97.3936 45.8833C122.381 45.8833 144.88 47.2656 160.595 53.5967C164.137 55.0239 166.975 57.7833 168.683 61.234C174.1 72.1751 177.149 84.526 177.149 97.5977Z" fill={colors.__x_black} />
                                <Path fillRule="evenodd" clipRule="evenodd" d="M127.09 115.012C129.507 116.068 132.2 116.595 135.167 116.595C138.097 116.595 140.771 116.085 143.189 115.065C145.607 114.01 147.695 112.602 149.453 110.843C151.248 109.049 152.622 107.026 153.574 104.775C154.563 102.523 155.058 100.166 155.058 97.7038C155.058 95.3115 154.581 92.9897 153.629 90.7381C152.713 88.4514 151.395 86.3934 149.673 84.5641C147.951 82.7347 145.882 81.2923 143.464 80.2369C141.046 79.1464 138.354 78.6011 135.387 78.6011C132.493 78.6011 129.819 79.1112 127.364 80.1314C124.947 81.1516 122.84 82.5588 121.045 84.353C119.287 86.112 117.913 88.1172 116.924 90.3688C115.935 92.6203 115.441 94.9949 115.441 97.4927C115.441 99.9201 115.899 102.277 116.814 104.564C117.767 106.815 119.104 108.856 120.826 110.685C122.584 112.479 124.672 113.922 127.09 115.012ZM126.87 101.292C126.503 100.096 126.32 98.8647 126.32 97.5982C126.32 96.3669 126.485 95.1708 126.815 94.0099C127.181 92.8138 127.731 91.7584 128.463 90.8437C129.196 89.8938 130.112 89.1375 131.211 88.5746C132.346 88.0117 133.683 87.7303 135.222 87.7303C136.724 87.7303 138.042 87.9941 139.178 88.5218C140.314 89.0495 141.248 89.7883 141.98 90.7381C142.713 91.6528 143.262 92.6906 143.629 93.8516C143.995 95.0125 144.178 96.2262 144.178 97.4927C144.178 98.724 143.995 99.9377 143.629 101.134C143.299 102.295 142.768 103.368 142.035 104.353C141.339 105.303 140.423 106.059 139.288 106.622C138.152 107.185 136.815 107.466 135.277 107.466C133.738 107.466 132.401 107.202 131.266 106.675C130.167 106.112 129.251 105.373 128.518 104.458C127.786 103.508 127.236 102.453 126.87 101.292Z" fill={item.icon} />
                                <Path d="M51.4594 82.3946C50.6716 81.3351 49.4377 80.7119 48.1276 80.7119H41.6203C39.8662 80.7119 38.896 82.7709 39.9998 84.1509L50.9452 97.8361L40.4629 111.052C39.3672 112.434 40.3386 114.485 42.0887 114.485H48.596C49.919 114.485 51.1634 113.849 51.9497 112.772L58.131 104.305L64.3122 112.772C65.0985 113.849 66.343 114.485 67.6659 114.485H74.1118C75.8619 114.485 76.8334 112.434 75.7377 111.052L65.2553 97.8361L76.2008 84.1509C77.3045 82.7709 76.3343 80.7119 74.5802 80.7119H68.1343C66.8243 80.7119 65.5904 81.3351 64.8025 82.3946L58.131 91.3669L51.4594 82.3946Z" fill={item.icon} />
                            </Svg>
                        </View>
                        <View style={[base.pt_10, base.align_center]}>
                            <TextTag type="textXl" style={[base.sans_700, base.pb_4, { color: item.color }]}>{item.title}</TextTag>
                            <TextTag type="textM" style={[base.sans_400, base.text_center, { color: item.color }]}>{item.description}</TextTag>
                        </View>
                    </View>
                    <View style={[base.pb_8]}>
                        <View style={[base.pb_10]}>
                            <View style={[styles.btnDummy]}></View>
                        </View>
                        <View style={[styles.paginationDummy]}></View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const Onboarding = () => {
    const [index, setIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const [showDummySplash, setShowDummySplash] = useState(true);
    const [triggerDummyView, setTriggerDummyView] = useState(false);
    const { updateOnboardingFlag } = useAppFlags();
    const { updateOnboardingStatus } = useStorage();
    const scrollX = useSharedValue(0);
    const onboardingAnime = useSharedValue(0);
    const splashOpacityAnime = useSharedValue(1);
    const leftMask = useVector(0, size.height-80);
    const rightMask = useVector(0, size.height-80);

    const navigateToHome = async () => {
        await updateOnboardingStatus();
        updateOnboardingFlag(true);
    }

    const getPrevSlide = () => { return ONBOARDING_DATA[index - 1] };
    const getNextSlide = () => { return ONBOARDING_DATA[index + 1] };
    const prev = useMemo(getPrevSlide, [index]);
    const next = useMemo(getNextSlide, [index]);

    const handleNextClick = () => {
        if (!transitioning) {
            const newIndex = index + 1;
            if (newIndex < 3) {
                setTransitioning(true);
                const translateX = size.width * newIndex;
                rightMask.x.value = withTiming(size.width, {duration: 600, easing: Easing.ease});
                scrollX.value = withTiming(translateX, {duration: 600, easing: Easing.ease}, (isFinished) => { if (isFinished) runOnJS(resetRight)(newIndex) });
            }
            else navigateToHome();
        }
    }

    const handlePrevClick = () => {
        if (!transitioning) {
            const newIndex = index - 1;
            if (newIndex >= 0) {
                setTransitioning(true);
                const translateX = size.width * newIndex;
                leftMask.x.value = withTiming(size.width, {duration: 600, easing: Easing.ease});
                scrollX.value = withTiming(translateX, {duration: 600, easing: Easing.ease}, (isFinished) => { if (isFinished) runOnJS(resetLeft)(newIndex) });
            }
        }
    }

    const handleSplashLayoutShift=(complete)=>{
        if(complete){
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setTriggerDummyView(true);
            splashOpacityAnime.value = withTiming(0, {
                duration: 600,
                easing: Easing.ease,
            },(isFinished)=>{if(isFinished)runOnJS(setShowDummySplash)(false)})
        }
    }

    const triggerSplashAnime=()=>{
        onboardingAnime.value = withDelay(1500, withTiming(1, {
            duration: 500,
            easing: Easing.ease,
        }, (isFinished)=>runOnJS(handleSplashLayoutShift)(isFinished)))
    }

    const resetRight = (index) => {
        rightMask.x.value = 0;
        setTransitioning(false);
        setIndex(index);
    }
    const resetLeft = (index) => {
        leftMask.x.value = 0;
        setTransitioning(false);
        setIndex(index);
    }

    useEffect(()=>{
        triggerSplashAnime();
    },[]);

    return (
        <>
            <View style={[base.flex_fill]}>
                {
                    index != null ?
                        <Animated.View style={[base.position_absolute, styles.cardMask, styles.maskAbsolute, base.align_stretch]}>
                            <OnboardingCard item={ONBOARDING_DATA[index]} />
                        </Animated.View>
                        : null
                }
                {
                    prev != null ?
                        <Animated.View style={[base.position_absolute, styles.cardMask, styles.maskAbsolute]}>
                            <CardMak side="LEFT" position={leftMask}>
                                <OnboardingCard item={prev} />
                            </CardMak>
                        </Animated.View>
                        : null
                }
                {
                    next != null ?
                        <Animated.View style={[base.position_absolute, styles.cardMask, styles.maskAbsolute]}>
                            <CardMak side="RIGHT" position={rightMask}>
                                <OnboardingCard item={next} />
                            </CardMak>
                        </Animated.View>
                        : null
                }
                <View style={[styles.btnWrap, base.position_absolute, base.align_stretch]}>
                    <View style={[base.pb_4, base.flex_row, base.px_8]}>
                        <View style={[base.pe_2]}>
                            {
                                prev? <RoundedArrowButton scrollX={scrollX} onClick={handlePrevClick} type="left"/>
                                : <View style={[styles.btnDummy]}></View>
                            }
                        </View>
                        <View style={[base.flex_fill, base.flex_row, base.align_center, base.justify_center]}>
                            {
                                ONBOARDING_INDICATORS.map((_, i) => {
                                    return (<PageIndicatorDot index={i} cardWrapperWidth={size.width} scrollX={scrollX} key={`dot-${i}`} />)
                                })
                            }
                        </View>
                        <View style={[base.ps_2]}>
                            <RoundedArrowButton scrollX={scrollX} onClick={handleNextClick} type="right"/>
                        </View>
                    </View>
                </View>
            </View>
            {showDummySplash? <OnboardingSplashDummy anime={onboardingAnime} opacityAnime={splashOpacityAnime} triggerLayoutShift={triggerDummyView}/>: null}
        </>
    )
}

const styles = StyleSheet.create({
    cardMask: {
        width: size.width,
        height: size.height
    },
    maskAbsolute: {
        top: 0,
        left: 0
    },
    cardWrap: {
        width: size.width,
        height: "100%"
    },
    btnDummy: {
        width: 64,
        height: 64
    },
    btnWrap: {
        width: size.width,
        bottom: 32,
        left: 0
    },
    paginationDummy: {
        height: 12
    },
})


export default Onboarding;