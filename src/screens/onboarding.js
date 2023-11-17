import React from "react";
import { ScrollView, View } from "react-native";
import { base } from "../styles";
import { colors } from "../config";

const Onboarding =()=>{
    return(
        <ScrollView style={[base.flex_fill, { backgroundColor: colors.__x_white }]} contentContainerStyle={base.flex_grow} keyboardShouldPersistTaps="handled">
            <View style={[base.flex_fill, base.page_h_padding, base.page_v_padding]}>

            </View>
        </ScrollView>
    )
}

export default Onboarding;