import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native';

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Platform.OS === 'android' && StatusBar.currentHeight ? Dimensions.get('screen').height - StatusBar.currentHeight : Dimensions.get('window').height;
const PAGE_PADDING = 16;
const AVAILABLE_SCREEN_WIDTH = WINDOW_WIDTH - (PAGE_PADDING*2);

/* Offer Card Specs */

const BASE_WIDTH_GUIDE = 380;
const scale = WINDOW_WIDTH / BASE_WIDTH_GUIDE;

function normalize(size:number) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

const SIZE = {
    "width": WINDOW_WIDTH,
    "height": WINDOW_HEIGHT,
    "pagePadding": PAGE_PADDING,
    "availableWidth": AVAILABLE_SCREEN_WIDTH,
    "indicator": 10,
    "FS_2": normalize(2),
    "FS_3": normalize(3),
    "FS_4": normalize(4),
    "FS_6": normalize(6),
    "FS_8": normalize(8),
    "FS_10": normalize(10),
    "FS_12": normalize(12),
    "FS_14": normalize(14),
    "FS_16": normalize(16),
    "FS_18": normalize(18),
    "FS_20": normalize(20),
    "FS_22": normalize(22),
    "FS_23": normalize(23),
    "FS_24": normalize(24),
    "FS_26": normalize(26),
    "FS_28": normalize(28),
    "FS_30" : normalize(30),
    "FS_32" : normalize(32),
    "FS_34" : normalize(34),
    "FS_36" : normalize(36),
    "FS_38" : normalize(38),
    "FS_40" : normalize(40),
    "FS_44" : normalize(44),
    "FS_48" : normalize(48),
    "FS_50" : normalize(50),
    "FS_60" : normalize(60),
    "FS_64" : normalize(64),
    "FS_70" : normalize(70),
    "FS_76" : normalize(76),
    "FS_80" : normalize(80),
    "FS_88" : normalize(88),
    "FS_94" : normalize(94),
    "FS_98" : normalize(99),
    "FS_120" : normalize(120),
    "FS_140" : normalize(140),
    "FS_160" : normalize(160),
}

export default SIZE;