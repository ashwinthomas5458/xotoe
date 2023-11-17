import React, { useState } from "react";
import { KeyboardTypeOptions, Platform, StyleSheet, TextInput, View } from "react-native";
import { base, size } from "../../styles";
import { colors } from "../../config";

type InputBoxProps = {
    id: string|number,
    index: string|number,
    placeholder: string,
    value: string|undefined,
    secureTextEntry?: boolean|undefined,
    keyboardType?: KeyboardTypeOptions,
    isMultiLine?: boolean|undefined,
    numberOfLines?: number|undefined,
    autoCapitalize?: 'none'|'sentences'|'words'|'characters'|undefined,
    onChange: (val: string|undefined, id: string|number, index: string|number)=>void,
    isEditable?: boolean|undefined,
};
const InputBox = ({
    id,
    index,
    placeholder,
    value,
    secureTextEntry = false,
    keyboardType = "default",
    isMultiLine,
    numberOfLines,
    autoCapitalize = "words",
    onChange,
    isEditable = true,
}: InputBoxProps)=>{
    const [isFocused, setIsFocused] = useState(false);

    const onChangeText=(value: string)=>{
        onChange(value, id, index);
    }

    const handleInputFocus=()=>{
        setIsFocused(true);
    }

    const handleInputBlur=()=>{
        setIsFocused(false);
    }


    return(
        <View style={[base.align_stretch]}>
            <View style={[styles.wrapper, base.align_stretch, {borderColor: isFocused? colors.__x_orange: colors.__x_white}]}>
                <View style={[base.align_stretch, styles.container, {borderColor: colors.__x_black}]}>
                    <TextInput
                        autoCorrect={false}
                        placeholderTextColor={colors.__x_grey}
                        value={value}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                        placeholder={placeholder}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        secureTextEntry={secureTextEntry}
                        multiline={isMultiLine}
                        numberOfLines={numberOfLines}
                        autoCapitalize={autoCapitalize}
                        editable={isEditable}
                        textAlignVertical={isMultiLine && Platform.OS === "android" ? "top" : "center"}
                        style={[styles.input, base.sans_400, base.px_7, base.py_5, { color: colors.__x_black }]}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: size.FS_16,
        lineHeight: size.FS_20,
    },
    wrapper: {
        borderRadius: 4,
        borderWidth: 2,
        padding: 1
    },
    container: {
        borderRadius: 4,
        borderWidth: 2,
    }
});

export default InputBox;