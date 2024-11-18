import { View, Text, Pressable, TextInput } from 'react-native'
import React, { FC } from 'react'
import { useStyles } from 'react-native-unistyles';
import { phoneStyles } from '@unistyles/phoneStyles';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import Icon from '@components/global/Icon';


interface PhoneInputProps {
    onFocus: () => void;
    onBlur: () => void;
    onChangeText: (text: string) => void;
    value: string;
}



const PhoneInput: FC<PhoneInputProps> = ({ onFocus, onBlur, onChangeText, value }) => {
    const { styles } = useStyles(phoneStyles);
    return (
        <View style={styles.container}>
            <Pressable style={styles.countryPickerContainer}>
                <CustomText
                    variant='h6'
                    style={phoneStyles.countryPickerContainer}
                > 🇮🇳</CustomText>
                <Icon iconFamily="Ionicons" name='caret-down-sharp' size={18} color={Colors.lightText} />
            </Pressable>

            <View style={styles.phoneInputContainer}>
                <CustomText fontFamily='Okra-Bold' >+91</CustomText>
                <TextInput
                    placeholder='Enter your phone number'
                    keyboardType='number-pad'
                    value={value}
                    placeholderTextColor={Colors.lightText}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    style={styles.input}
                />
            </View>
        </View>
    )
}

export default PhoneInput