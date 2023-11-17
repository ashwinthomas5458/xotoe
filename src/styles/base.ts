import { StyleSheet } from "react-native";
import { FONT } from "./fonts"; 
import SIZE from "./size";
import { BasicStyleType, MarginObjectType, PaddingObjectType } from "./types";

const SIZE_BASE = 4;

function generateStyles(suffix:string, key:string){
    let item: any = {}
    for(let i=1; i<=10; i++){
        item[`${suffix}_${i}`]={};
        item[`${suffix}x_${i}`]={};
        item[`${suffix}y_${i}`]={};
        item[`${suffix}t_${i}`]={};
        item[`${suffix}b_${i}`]={};
        item[`${suffix}s_${i}`]={};
        item[`${suffix}e_${i}`]={};
        item[`${suffix}_${i}`][`${key}`] = i*SIZE_BASE;
        item[`${suffix}x_${i}`][`${key}Horizontal`] = i*SIZE_BASE;
        item[`${suffix}y_${i}`][`${key}Vertical`] = i*SIZE_BASE;
        item[`${suffix}t_${i}`][`${key}Top`] = i*SIZE_BASE;
        item[`${suffix}b_${i}`][`${key}Bottom`] = i*SIZE_BASE;
        item[`${suffix}s_${i}`][`${key}Left`] = i*SIZE_BASE;
        item[`${suffix}e_${i}`][`${key}Right`] = i*SIZE_BASE;
    }
    return item;
}

const paddings: PaddingObjectType = generateStyles("p", "padding");
const margins: MarginObjectType = generateStyles("m", "margin");


const BASE: BasicStyleType = StyleSheet.create({
    flex_fill: {flex: 1},
    flex_grow: {flexGrow: 1},
    display_flex: {display: "flex"},
    flex_row: {flexDirection: "row"},
    flex_column: {flexDirection: "column"},
    align_start:{alignItems: "flex-start"},
    align_center: {alignItems: "center"},
    align_stretch: {alignItems: "stretch"},
    align_end: {alignItems: "flex-end"},
    justify_start: {justifyContent: "flex-start"},
    justify_around: {justifyContent: "space-around"},
    justify_between: {justifyContent: "space-between"},
    justify_evenly: {justifyContent: "space-evenly"},
    justify_center: {justifyContent: "center"},
    justify_end: {justifyContent: 'flex-end'},
    position_relative: {position: "relative"},
    position_absolute: {position: "absolute"},
    w_100: {width: "100%"},
    h_100: {height: "100%"},
    text_start: {textAlign: "left"},
    text_end: {textAlign: "right"},
    text_justify: {textAlign: "justify"},
    text_center: {textAlign: "center"},
    text_upper_case: {textTransform: "uppercase"},
    text_lower_case: {textTransform: "lowercase"},
    text_capitalize: {textTransform: "capitalize"},
    flex_wrap: {flexWrap: "wrap"},
    rounded_sm: {borderRadius: 4},
    rounded_md: {borderRadius: 8},
    rounded_lg: {borderRadius: 16},
    overflow_hidden: {overflow: "hidden"},
    shadow_sm:{
        elevation: 8,
        shadowColor: "#0F2B4960",
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 8
    },
    shadow_lg:{
        elevation: 10,
        shadowColor: "#0F2B4980",
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.6,
        shadowRadius: 10
    },
    ...margins,
    ...paddings,
    page_h_padding: {paddingHorizontal: SIZE.pagePadding},
    page_v_padding: {paddingVertical: SIZE.FS_24},
    sans_300:{fontFamily: FONT.sans_300},
    sans_400:{fontFamily: FONT.sans_400},
    sans_500:{fontFamily: FONT.sans_500},
    sans_600:{fontFamily: FONT.sans_600},
    sans_700:{fontFamily: FONT.sans_700},
    sans_800:{fontFamily: FONT.sans_800},
    sans_900:{fontFamily: FONT.sans_900},
    serif_300:{fontFamily: FONT.serif_300},
    serif_400:{fontFamily: FONT.serif_400},
    serif_500:{fontFamily: FONT.serif_500},
    serif_600:{fontFamily: FONT.serif_600},
    serif_700:{fontFamily: FONT.serif_700},
    serif_800:{fontFamily: FONT.serif_800},
    serif_900:{fontFamily: FONT.serif_900},
});

export default BASE;