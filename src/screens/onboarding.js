import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { base, size } from "../styles";
import { colors } from "../config";
import { Circle, Path, Svg } from "react-native-svg";
import { AnimatedTextTag, TextTag } from "../components/textTags";
import Animated, { interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { PageIndicatorDot } from "../components/indicators";
import { RoundedArrowButton } from "../components/cta";
import useAppFlags from "../context/useFlagsContext";
import { useStorage } from "../services/hooks";

const ONBOARDING_DATA = [
    { "title": "Timeless classic", "description": "Rediscover the magic of the classic tic-tac-toe game as you embark on a journey through its timeless charm!", "background": colors.__x_red, "color": colors.__x_white, "icon": colors.__x_blue, "id": 1, "index": 0 },
    { "title": "Dual Dominance", "description": "Master both X and O roles across 6 games. Play in both places, strategize, and conquer the board.", "background": colors.__x_yellow, "color": colors.__x_black, "icon": colors.__x_green, "id": 2, "index": 1 },
    { "title": "Play Your Way", "description": "With diverse play modes, dive into multiplayer face-offs or challenge Xotoe for a solo gaming thrill.", "background": colors.__x_purple, "color": colors.__x_white, "icon": colors.__x_orange, "id": 3, "index": 2 },
];
const ONBOARDING_ICONS = [colors.__x_blue, colors.__x_green, colors.__x_orange];
const ONBOARDING_INDICATORS = ["1", "2", "3"];

const AnimatedIcon = ({ color, index, scrollX }) => {

    const opacityAnimeStyle = useAnimatedStyle(() => {

        const opacity = interpolate(
            scrollX.value,
            [
                ((index - 1) * size.width),
                index * size.width,
                ((index + 1) * size.width)
            ],
            [0, 1, 0],
        );

        return {
            opacity: opacity
        };
    });

    return (
        <Animated.View style={[base.position_absolute, styles.iconSvg, opacityAnimeStyle]}>
            <Svg width="200" height="200" viewBox="0 0 200 200" fill="none" >
                <Path fillRule="evenodd" clipRule="evenodd" d="M138.614 20.8487C126.238 13.9361 112.01 10 96.8723 10C67.0942 10 40.8338 25.2316 25.2738 48.3907C11.5564 54.6872 2 68.6733 2 84.9332V108.152C2 123.617 10.6471 137.026 23.2905 143.716C32.3361 158.476 45.6023 170.32 61.386 177.514C73.7618 184.426 87.9899 188.362 103.128 188.362C134.211 188.362 161.459 171.768 176.71 146.882C189.353 140.192 198 126.784 198 111.318V88.0994C198 71.8395 188.444 57.8534 174.726 51.5569C165.775 38.2335 153.281 27.5338 138.614 20.8487ZM50.0042 31.6131C42.3113 37.2226 35.6389 44.1768 30.3231 52.1356C30.7214 51.936 31.1234 51.7431 31.5291 51.5569C36.6242 43.9735 42.8666 37.2401 50.0042 31.6131ZM22.8471 57.0088C13.9456 64.3595 8.25532 75.5525 8.25532 88.0994V84.9332C8.25532 73.327 14.0386 63.0881 22.8471 57.0088ZM64.1803 171.842C51.6713 164.802 41.2149 154.477 33.9492 142.018C22.4763 136.677 14.5106 124.939 14.5106 111.318V88.0994C14.5106 73.7955 23.2948 61.5685 35.7002 56.6451C50.0029 34.2903 74.8589 19.4986 103.128 19.4986C114.77 19.4986 125.834 22.0076 135.82 26.5205C147.357 33.0129 157.148 42.3003 164.3 53.4789C176.705 58.4023 185.489 70.6293 185.489 84.9332V108.152C185.489 121.773 177.524 133.511 166.051 138.852C152.085 162.799 126.332 178.864 96.8723 178.864C85.2299 178.864 74.1662 176.355 64.1803 171.842Z" fill={colors.__x_black} />
                <Path d="M164.3 53.479C176.706 58.4024 185.49 70.6294 185.49 84.9333V108.152C185.49 121.773 177.524 133.511 166.051 138.852C152.086 162.799 126.333 178.864 96.8729 178.864C67.4132 178.864 41.6599 162.799 27.6945 138.852C16.2216 133.511 8.25586 121.773 8.25586 108.152V84.9333C8.25586 70.6294 17.0401 58.4024 29.4454 53.479C43.7482 31.1242 68.6041 16.3325 96.8729 16.3325C125.142 16.3325 149.998 31.1242 164.3 53.479Z" fill={color} />
                <Path d="M177.149 97.5977C177.149 103.731 176.478 109.706 175.206 115.451C161.435 141.933 131.769 166.199 97.3936 166.199C61.4834 166.199 30.7132 139.719 17.8338 111.894C17.0202 107.253 16.5957 102.475 16.5957 97.5977C16.5957 84.7774 19.5283 72.6504 24.7514 61.8668C26.3462 58.5743 28.9652 55.8832 32.2808 54.4065C48.0529 47.3821 71.3739 45.8833 97.3936 45.8833C122.381 45.8833 144.88 47.2656 160.595 53.5967C164.137 55.0239 166.975 57.7833 168.683 61.234C174.1 72.1751 177.149 84.526 177.149 97.5977Z" fill={colors.__x_black} />
                <Path fillRule="evenodd" clipRule="evenodd" d="M127.09 115.012C129.507 116.068 132.2 116.595 135.167 116.595C138.097 116.595 140.771 116.085 143.189 115.065C145.607 114.01 147.695 112.602 149.453 110.843C151.248 109.049 152.622 107.026 153.574 104.775C154.563 102.523 155.058 100.166 155.058 97.7038C155.058 95.3115 154.581 92.9897 153.629 90.7381C152.713 88.4514 151.395 86.3934 149.673 84.5641C147.951 82.7347 145.882 81.2923 143.464 80.2369C141.046 79.1464 138.354 78.6011 135.387 78.6011C132.493 78.6011 129.819 79.1112 127.364 80.1314C124.947 81.1516 122.84 82.5588 121.045 84.353C119.287 86.112 117.913 88.1172 116.924 90.3688C115.935 92.6203 115.441 94.9949 115.441 97.4927C115.441 99.9201 115.899 102.277 116.814 104.564C117.767 106.815 119.104 108.856 120.826 110.685C122.584 112.479 124.672 113.922 127.09 115.012ZM126.87 101.292C126.503 100.096 126.32 98.8647 126.32 97.5982C126.32 96.3669 126.485 95.1708 126.815 94.0099C127.181 92.8138 127.731 91.7584 128.463 90.8437C129.196 89.8938 130.112 89.1375 131.211 88.5746C132.346 88.0117 133.683 87.7303 135.222 87.7303C136.724 87.7303 138.042 87.9941 139.178 88.5218C140.314 89.0495 141.248 89.7883 141.98 90.7381C142.713 91.6528 143.262 92.6906 143.629 93.8516C143.995 95.0125 144.178 96.2262 144.178 97.4927C144.178 98.724 143.995 99.9377 143.629 101.134C143.299 102.295 142.768 103.368 142.035 104.353C141.339 105.303 140.423 106.059 139.288 106.622C138.152 107.185 136.815 107.466 135.277 107.466C133.738 107.466 132.401 107.202 131.266 106.675C130.167 106.112 129.251 105.373 128.518 104.458C127.786 103.508 127.236 102.453 126.87 101.292Z" fill={color} />
                <Path d="M51.4594 82.3946C50.6716 81.3351 49.4377 80.7119 48.1276 80.7119H41.6203C39.8662 80.7119 38.896 82.7709 39.9998 84.1509L50.9452 97.8361L40.4629 111.052C39.3672 112.434 40.3386 114.485 42.0887 114.485H48.596C49.919 114.485 51.1634 113.849 51.9497 112.772L58.131 104.305L64.3122 112.772C65.0985 113.849 66.343 114.485 67.6659 114.485H74.1118C75.8619 114.485 76.8334 112.434 75.7377 111.052L65.2553 97.8361L76.2008 84.1509C77.3045 82.7709 76.3343 80.7119 74.5802 80.7119H68.1343C66.8243 80.7119 65.5904 81.3351 64.8025 82.3946L58.131 91.3669L51.4594 82.3946Z" fill={color} />
            </Svg>
        </Animated.View>
    )
}

const AnimatedBtn = ({ color, index, scrollX }) => {
    const opacityAnimeStyle = useAnimatedStyle(() => {

        const opacity = interpolate(
            scrollX.value,
            [
                ((index - 1) * size.width),
                index * size.width,
                ((index + 1) * size.width)
            ],
            [0, 1, 0],
        );

        return {
            opacity: opacity
        };
    });
    return (
        <Animated.View style={[base.position_absolute, styles.iconSvg, opacityAnimeStyle]}>
            <Svg width="62" height="62" viewBox="0 0 62 62" fill="none">
                <Circle cx="32" cy="32" r="30" fill={colors.__x_black} />
                <Circle cx="30" cy="30" r="29" fill={color} stroke={colors.__x_black} strokeWidth="2" />
                <Path d="M26 38L34 30L26 22" stroke={colors.__x_black} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
        </Animated.View>
    )
}

const OnboardingCard = ({ item, index, scrollX }) => {

    const headingAnimeStyle = useAnimatedStyle(() => {

        const translateX = interpolate(
            scrollX.value,
            [
                ((index - 1) * size.width),
                index * size.width,
                ((index + 1) * size.width)
            ],
            [(0.2 * size.width), 0, (-0.2 * size.width)],
        );

        const opacity = interpolate(
            scrollX.value,
            [
                ((index - 1) * size.width),
                index * size.width,
                ((index + 1) * size.width)
            ],
            [0, 1, 0],
        );

        return {
            transform: [{translateX}],
            opacity: opacity
        };
    });

    const descAnimeStyle = useAnimatedStyle(() => {

        const translateX = interpolate(
            scrollX.value,
            [
                ((index - 1) * size.width),
                index * size.width,
                ((index + 1) * size.width)
            ],
            [(0.8 * size.width), 0, (-0.8 * size.width)],
        );

        const opacity = interpolate(
            scrollX.value,
            [
                ((index - 1) * size.width),
                index * size.width,
                ((index + 1) * size.width)
            ],
            [0, 1, 0],
        );

        return {
            transform: [{translateX}],
            opacity: opacity
        };
    });


    return (
        <View style={[styles.cardWrap, base.align_stretch, base.justify_center]}>
            <View style={[base.flex_fill, base.py_4, base.justify_center]}>
                <View style={[styles.iconDummy]}></View>
                <View style={[base.pt_10, base.align_center]}>
                    <AnimatedTextTag type="textXl" style={[base.sans_900, base.pb_4, headingAnimeStyle, { color: item.color }]}>{item.title}</AnimatedTextTag>
                    <AnimatedTextTag type="textM" style={[base.sans_400, base.text_center, descAnimeStyle, { color: item.color }]}>{item.description}</AnimatedTextTag>
                </View>
            </View>
            <View style={[base.pb_8]}>
                <View style={[base.pb_10]}>
                    <View style={[styles.btnDummy]}></View>
                </View>
                <View style={[styles.paginationDummy]}></View>
            </View>
        </View>
    )
}

const Onboarding = () => {
    const [currentPosition, setCurrentposition] = useState(0);
    const onboardingRef = useRef(null);
    const scrollX = useSharedValue(0);
    const { updateOnboardingFlag } = useAppFlags();
    const { updateOnboardingStatus } = useStorage();

    const navigateToHome=async()=>{
        await updateOnboardingStatus();
        updateOnboardingFlag(true);
    }

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
    };

    const scrollToIndex = (index) => {
        setCurrentposition(index);
        onboardingRef.current?.scrollToIndex({index:index});
    }

    const renderOnboardingCard = useCallback(({ item, index }) => (
        <OnboardingCard item={item} index={index} scrollX={scrollX} />
    ), []);

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems && viewableItems.length) {
            let current = viewableItems[0].index;
            setCurrentposition(current);
        }
    }, []);

    const keyExtractor = useCallback((_, index) => `onboarding-${index}`, []);

    const wrapAnimeStyle = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(
            scrollX.value,
            [
                0,
                size.width,
                2*size.width
            ],
            [colors.__x_red, colors.__x_yellow, colors.__x_purple]
        );

        return {
            backgroundColor: backgroundColor
        };
    });

    const handleScrollClick=()=>{
        let next = currentPosition+1;
        if(next<3){
            setCurrentposition(next);
            scrollToIndex(next);
        }
        else navigateToHome();
    }

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            scrollX.value = event.contentOffset.x;
        },
    });

    return (
        <Animated.View style={[base.flex_fill, base.position_relative, wrapAnimeStyle]}>
            <Animated.FlatList
                style={[base.flex_fill]}
                ref={onboardingRef}
                horizontal
                data={ONBOARDING_DATA}
                renderItem={renderOnboardingCard}
                keyExtractor={keyExtractor}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                decelerationRate="normal"
                snapToInterval={size.width}
                pagingEnabled={true}
                disableIntervalMomentum={true}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                onScroll={onScroll}
                scrollEventThrottle={16}
            />
            <View style={[base.position_absolute, base.h_100, base.align_center, base.justify_center, styles.wrap]}>
                <View style={[base.flex_fill, base.align_center, base.justify_center, base.py_4]}>
                    <View style={[styles.iconDummy, base.position_relative]}>
                        {
                            ONBOARDING_ICONS.map((color, i) => {
                                return (<AnimatedIcon color={color} index={i} scrollX={scrollX} key={`icon-${i}`} />)
                            })
                        }
                    </View>
                    <View style={[base.pt_10, base.align_center]}>
                        <TextTag type="textXl" style={[base.sans_900, base.pb_4, { color: "#FFF0" }]}> </TextTag>
                        <TextTag type="textM" style={[base.sans_400, { color: "#FFF0" }]}> </TextTag>
                    </View>
                </View>
                <View style={[base.pb_8]}>
                    <View style={[base.pb_10]}>
                       <RoundedArrowButton scrollX={scrollX} onClick={handleScrollClick}/>
                    </View>
                    <View style={[base.pt_6, base.flex_row, base.align_center]}>
                        {
                            ONBOARDING_INDICATORS.map((_, i) => {
                                return (<PageIndicatorDot index={i} cardWrapperWidth={size.width} scrollX={scrollX} key={`dot-${i}`} />)
                            })
                        }
                    </View>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    cardWrap: {
        width: size.width,
        height: "100%"
    },
    iconDummy: {
        width: 200,
        height: 200
    },
    wrap: {
        top: 0,
        left: 0,
        width: size.width
    },
    btnDummy: {
        width: 62,
        height: 62
    },
    paginationDummy: {
        height: 12
    },
    iconSvg: {
        top: 0,
        left: 0
    },
    rectBg: {
        right:0,
        bottom: 0,
    }
})

export default Onboarding;