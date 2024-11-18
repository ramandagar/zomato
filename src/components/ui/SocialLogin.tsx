import { TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { phoneStyles } from '@unistyles/phoneStyles';
import { useStyles } from 'react-native-unistyles';
import Icon from '@components/global/Icon';
import { Colors } from '@unistyles/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

const SocialLogin: FC = () => {
    const { styles } = useStyles(phoneStyles);
  return (
    <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.iconContainer}>
            <Icon iconFamily='Ionicons' name='logo-google'  color='#db4437' size={RFValue(18)}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
            <Icon iconFamily='Ionicons' name='logo-apple' color='#222' size={RFValue(18)}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
            <Icon iconFamily='Ionicons' name='logo-facebook' color='#3b5998' size={RFValue(18)}/>
        </TouchableOpacity>
    </View>
  )
}

export default SocialLogin