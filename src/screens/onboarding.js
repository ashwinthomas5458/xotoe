import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Platform, UIManager, LayoutAnimation, Image } from "react-native";
import Animated, { Easing, Extrapolation, interpolate, runOnJS, useAnimatedProps, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";

import { base, size } from "../styles";
import { colors } from "../config";
import useAppFlags from "../context/useFlagsContext";
import { useStorage } from "../services/hooks";

import { TextTag } from "../components/textTags";
import { RoundedArrowButton } from "../components/cta";
import { PageIndicatorDot } from "../components/indicators";
import { OnboardingSplashDummy } from "../components/splashScreen";

import OnboardingOne from "../assets/images/onboard_1.png";
import OnboardingTwo from "../assets/images/onboard_2.png";
import OnboardingThree from "../assets/images/onboard_3.png";

const CARD_WIDTH = size.width * 0.8;
const CARD_HEIGHT = CARD_WIDTH * 1.5;
const DELTA_X = CARD_WIDTH * 0.34;
const ONBOARDING_DATA = [
    { "title": "Timeless classic", "description": "Rediscover the magic of the classic tic-tac-toe game as you embark on a journey through its timeless charm!", "background": colors.__x_red, "color": colors.__x_white, "icon": colors.__x_blue, "id": 1, "index": 0, "background_item": OnboardingOne },
    { "title": "Dual Dominance", "description": "Master both X and O roles across 6 games. Play in both places, strategize, and conquer the board.", "background": colors.__x_yellow, "color": colors.__x_black, "icon": colors.__x_green, "id": 2, "index": 1, "background_item": OnboardingTwo },
    { "title": "Play Your Way", "description": "With diverse play modes, dive into multiplayer face-offs or challenge Xotoe for a solo gaming thrill.", "background": colors.__x_purple, "color": colors.__x_white, "icon": colors.__x_orange, "id": 3, "index": 2, "background_item": OnboardingThree },
];
const ONBOARDING_INDICATORS = ["1", "2", "3"];
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const OnboardingCard = ({ item, scrollX, index }) => {

    const cardStyle = useAnimatedStyle(() => {
        let translateX = interpolate(
            scrollX.value,
            [size.width * (index - 1), size.width * index, size.width * (index + 1)],
            [-DELTA_X, 0, DELTA_X],
            Extrapolation.CLAMP
        )
        // let translateY = interpolate(
        //     scrollX.value,
        //     [size.width * (index - 1), size.width * index, size.width * (index + 1)],
        //     [48, 0, 48],
        //     Extrapolation.CLAMP
        // )
        // let rotateZ = interpolate(
        //     scrollX.value,
        //     [size.width * (index - 1), size.width * index, size.width * (index + 1)],
        //     [0.1, 0, -0.1],
        //     Extrapolation.CLAMP
        // )
        let scale = interpolate(
            scrollX.value,
            [size.width * (index - 1), size.width * index, size.width * (index + 1)],
            [0.8, 1, 0.8],
            Extrapolation.CLAMP
        )

        return {
            transform: [{ scale }, { translateX }]
        }
    })

    return (
        <View style={[base.position_relative, styles.cardWidth]}>
            <Animated.View style={[base.w_100, base.h_100, styles.maskAbsolute, base.position_absolute, base.align_stretch, cardStyle]}>
               <View style={[base.flex_fill, base.align_stretch]}>
               <View style={[base.justify_center, base.align_center, base.flex_fill]}>
                    <View style={[styles.cardWrap, styles.cardBorder, base.rounded_lg, base.align_stretch, base.p_3, { backgroundColor: colors.__x_white, borderColor: colors.__x_black }]}>
                        <View style={[base.align_stretch, styles.cardBorder, base.rounded_md, base.justify_center, base.px_6, base.flex_fill, { backgroundColor: item.background, borderColor: colors.__x_black }]}>
                            <View style={[base.flex_fill, base.py_4, base.justify_center]}>
                                <View style={[base.align_center]}>
                                    <Svg width="120" height="120" viewBox="0 0 120 120" fill="none" >
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M83.1688 12.5092C75.7432 8.36163 67.2061 6 58.1236 6C40.2567 6 24.5004 15.139 15.1645 29.0344C6.93403 32.8123 1.2002 41.204 1.2002 50.9599V64.8912C1.2002 74.1704 6.38848 82.2157 13.9745 86.2294C19.4018 95.0857 27.3616 102.192 36.8318 106.508C44.2573 110.656 52.7942 113.017 61.8768 113.017C80.5267 113.017 96.8755 103.061 106.026 88.1291C113.612 84.1154 118.8 76.0701 118.8 66.7909V52.8596C118.8 43.1037 113.066 34.712 104.836 30.9341C99.465 22.9401 91.969 16.5203 83.1688 12.5092ZM30.0027 18.9679C25.387 22.3336 21.3836 26.5061 18.1941 31.2813C18.433 31.1616 18.6742 31.0459 18.9176 30.9341C21.9747 26.3841 25.7202 22.344 30.0027 18.9679ZM13.7084 34.2053C8.36755 38.6157 4.95339 45.3315 4.95339 52.8596V50.9599C4.95339 43.9962 8.42336 37.8529 13.7084 34.2053ZM38.5084 103.105C31.003 98.8813 24.7292 92.6862 20.3697 85.2109C13.486 82.0063 8.70658 74.9636 8.70658 66.7909V52.8596C8.70658 44.2773 13.9771 36.9411 21.4203 33.9871C30.002 20.5742 44.9156 11.6991 61.8768 11.6991C68.8623 11.6991 75.5005 13.2045 81.492 15.9123C88.4142 19.8077 94.2888 25.3802 98.5801 32.0873C106.023 35.0414 111.294 42.3776 111.294 50.9599V64.8912C111.294 73.0639 106.514 80.1066 99.6307 83.3112C91.2514 97.6796 75.7994 107.318 58.1236 107.318C51.1381 107.318 44.4999 105.813 38.5084 103.105Z" fill={colors.__x_black} />
                                        <Path d="M98.5798 32.0872C106.023 35.0413 111.294 42.3775 111.294 50.9598V64.891C111.294 73.0638 106.514 80.1065 99.6304 83.311C91.2511 97.6795 75.7991 107.318 58.1233 107.318C40.4475 107.318 24.9955 97.6795 16.6163 83.311C9.73254 80.1065 4.95312 73.0638 4.95312 64.891V50.9598C4.95312 42.3775 10.2236 35.0413 17.6669 32.0872C26.2485 18.6743 41.1621 9.79932 58.1233 9.79932C75.0846 9.79932 89.9982 18.6743 98.5798 32.0872Z" fill={item.icon} />
                                        <Path d="M106.289 58.5584C106.289 62.2385 105.886 65.8234 105.123 69.2703C96.8607 85.1599 79.0613 99.7189 58.4357 99.7189C36.8897 99.7189 18.4275 83.8313 10.6999 67.136C10.2117 64.3514 9.95703 61.485 9.95703 58.5584C9.95703 50.8662 11.7166 43.5901 14.8505 37.1199C15.8073 35.1444 17.3787 33.5297 19.3681 32.6437C28.8313 28.4291 42.824 27.5298 58.4357 27.5298C73.4284 27.5298 86.9279 28.3592 96.3564 32.1578C98.482 33.0142 100.185 34.6698 101.21 36.7402C104.46 43.3049 106.289 50.7154 106.289 58.5584Z" fill={colors.__x_black} />
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M76.2537 69.0074C77.7043 69.6406 79.3198 69.9572 81.1001 69.9572C82.8584 69.9572 84.4629 69.6512 85.9135 69.039C87.3641 68.4058 88.6169 67.5615 89.6719 66.5061C90.7488 65.4296 91.573 64.2159 92.1445 62.865C92.7379 61.514 93.0346 60.0998 93.0346 58.6223C93.0346 57.1869 92.7489 55.7938 92.1775 54.4429C91.628 53.0709 90.8367 51.8361 89.8037 50.7384C88.7707 49.6408 87.5289 48.7754 86.0783 48.1422C84.6277 47.4878 83.0122 47.1606 81.2319 47.1606C79.4956 47.1606 77.8912 47.4667 76.4186 48.0788C74.968 48.691 73.7042 49.5353 72.6272 50.6118C71.5722 51.6672 70.748 52.8703 70.1546 54.2213C69.5611 55.5722 69.2644 56.9969 69.2644 58.4956C69.2644 59.9521 69.5392 61.3663 70.0886 62.7383C70.6601 64.0892 71.4623 65.3135 72.4953 66.4111C73.5503 67.4876 74.8031 68.353 76.2537 69.0074ZM76.1218 60.7753C75.9021 60.0576 75.7922 59.3188 75.7922 58.5589C75.7922 57.8202 75.8911 57.1025 76.0889 56.4059C76.3087 55.6883 76.6383 55.055 77.0779 54.5062C77.5175 53.9363 78.067 53.4825 78.7263 53.1447C79.4077 52.807 80.2099 52.6382 81.133 52.6382C82.0342 52.6382 82.8254 52.7965 83.5068 53.1131C84.1881 53.4297 84.7486 53.873 85.1882 54.4429C85.6277 54.9917 85.9574 55.6144 86.1772 56.3109C86.397 57.0075 86.5069 57.7357 86.5069 58.4956C86.5069 59.2344 86.397 59.9626 86.1772 60.6803C85.9794 61.3768 85.6607 62.0206 85.2211 62.6117C84.8035 63.1816 84.254 63.6354 83.5727 63.9731C82.8914 64.3108 82.0891 64.4797 81.166 64.4797C80.2429 64.4797 79.4407 64.3214 78.7593 64.0048C78.1 63.6671 77.5505 63.2238 77.1109 62.675C76.6713 62.1051 76.3416 61.4718 76.1218 60.7753Z" fill={item.icon} />
                                        <Path d="M30.8757 49.4368C30.4029 48.801 29.6626 48.4271 28.8766 48.4271H24.9722C23.9197 48.4271 23.3376 49.6625 23.9999 50.4905L30.5671 58.7016L24.2777 66.6314C23.6203 67.4602 24.2032 68.6907 25.2532 68.6907H29.1576C29.9514 68.6907 30.6981 68.3095 31.1698 67.6632L34.8786 62.5831L38.5873 67.6632C39.0591 68.3095 39.8058 68.6907 40.5996 68.6907H44.4671C45.5171 68.6907 46.1 67.4602 45.4426 66.6314L39.1532 58.7016L45.7205 50.4905C46.3827 49.6625 45.8006 48.4271 44.7481 48.4271H40.8806C40.0946 48.4271 39.3542 48.801 38.8815 49.4368L34.8786 54.8202L30.8757 49.4368Z" fill={item.icon} />
                                    </Svg>
                                </View>
                                <View style={[base.pt_10, base.align_center]}>
                                    <TextTag type="textLg" style={[base.sans_700, base.pb_4, { color: item.color }]}>{item.title}</TextTag>
                                    <TextTag type="textSm" style={[base.sans_400, base.text_center, { color: item.color }]}>{item.description}</TextTag>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[base.cardWidth]}>
                    <View style={[styles.dummySpacing]}></View>
                </View>
               </View>
            </Animated.View>
        </View>
    )
}

const BackgroundCard = ({ item, index, scrollX }) => {

    const cardStyle = useAnimatedStyle(() => {
        let opacity = interpolate(
            scrollX.value,
            [size.width * (index - 1), size.width * index, size.width * (index + 1)],
            [0, 1, 0],
            Extrapolation.CLAMP
        )

        return {
            opacity
        }
    })


    return (
        <Animated.View style={cardStyle}>
            <Image source={item.background_item} style={[base.position_absolute, styles.cardMask, styles.maskAbsolute]} blurRadius={120} />
        </Animated.View>
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

    const scrollRef = useRef();

    const navigateToHome = async () => {
        await updateOnboardingStatus();
        updateOnboardingFlag(true);
    }

    const scrollCardToIndex = (i) => {
        let offset = size.width * (i);
        scrollRef.current.scrollToOffset({ offset });
    }

    const handleNextClick = () => {
        let i = index + 1;
        if (i === 3) navigateToHome();
        else scrollCardToIndex(i);
        setIndex(i);
    }

    const handlePrevClick = () => {
        let i = index - 1;
        if (i > -1) scrollCardToIndex(i);
        setIndex(i);
    }

    const onMomentumScrollEnd=(e)=>{
        let offset = e.nativeEvent.contentOffset.x;
        let calculatedIndex = Math.ceil(offset/size.width);
        setIndex(calculatedIndex);
    }

    const onScrollX = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    const renderOnboardingCards = useCallback(({ item, index }) => (<OnboardingCard item={item} index={index} scrollX={scrollX} />), []);

    const keyExtractor = useCallback((_, index) => `$onboarding-card-${index}`, []);

    const handleSplashLayoutShift = (complete) => {
        if (complete) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setTriggerDummyView(true);
            splashOpacityAnime.value = withTiming(0, {
                duration: 600,
                easing: Easing.ease,
            }, (isFinished) => { if (isFinished) runOnJS(setShowDummySplash)(false) })
        }
    }

    const triggerSplashAnime = () => {
        onboardingAnime.value = withDelay(1500, withTiming(1, {
            duration: 500,
            easing: Easing.ease,
        }, (isFinished) => runOnJS(handleSplashLayoutShift)(isFinished)))
    }

    useEffect(() => {
        triggerSplashAnime();
    }, []);

    return (
        <>
            <View style={[base.flex_fill, base.position_relative]}>
                <>
                    {
                        ONBOARDING_DATA.map((item, i) => {
                            return <BackgroundCard item={item} index={i} key={`bg-card-${i + 1}`} scrollX={scrollX} />
                        })
                    }
                </>
                <Animated.FlatList
                    ref={scrollRef}
                    showsHorizontalScrollIndicator={false}
                    data={ONBOARDING_DATA}
                    keyExtractor={keyExtractor}
                    renderItem={renderOnboardingCards}
                    horizontal
                    bounces={false}
                    decelerationRate={0.98}
                    renderToHardwareTextureAndroid
                    snapToInterval={size.width}
                    snapToAlignment="start"
                    scrollEventThrottle={16}
                    onScroll={onScrollX}
                    removeClippedSubviews={false}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    disableIntervalMomentum={true}
                />
                <View style={[styles.btnWrap, base.position_absolute, base.align_stretch]}>
                    <View style={[base.pb_4, base.flex_row, base.px_8]}>
                        <View style={[base.pe_2]}>
                            {
                                index ? <RoundedArrowButton scrollX={scrollX} onClick={handlePrevClick} type="left" />
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
                            <RoundedArrowButton scrollX={scrollX} onClick={handleNextClick} type="right" />
                        </View>
                    </View>
                </View>
            </View>
            {showDummySplash ? <OnboardingSplashDummy anime={onboardingAnime} opacityAnime={splashOpacityAnime} triggerLayoutShift={triggerDummyView} /> : null}
        </>
    )
}

const styles = StyleSheet.create({
    cardMask: {
        width: size.width,
        height: size.height
    },
    cardWidth: {
        width: size.width,
    },
    maskAbsolute: {
        top: 0,
        left: 0
    },
    cardWrap: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT
    },
    cardBorder: {
        borderWidth: 4
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
    dummySpacing: {
        width: "100%",
        height: 80
    }
})


export default Onboarding;