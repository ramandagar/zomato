import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { restaurantHeaderStyles } from '@unistyles/restuarantStyles'
import { useStyles } from 'react-native-unistyles'
import Icon from '@components/global/Icon'
import { Colors } from '@unistyles/Constants'
import { goBack } from '@utils/NavigationUtils'
import CustomText from '@components/global/CustomText'

interface RestaurantHeaderProps {
    title: string
}

const RestaurantHeader: FC<RestaurantHeaderProps> = ({ title }) => {
    const { styles } = useStyles(restaurantHeaderStyles)
    return (
        <View style={styles.headerContainer}>
            <View style={styles.flexRowGap}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Icon color={'black'} name='arrow-left' size={24} iconFamily='MaterialCommunityIcons' />
                </TouchableOpacity>
                <View >
                    <CustomText fontFamily='Okra-Medium' fontSize={9.5} style={styles.title}>{title}</CustomText>
                    <CustomText fontFamily='Okra-Bold' fontSize={11} style={styles.title}>Recommended for you</CustomText>
                </View>
            </View>
            <TouchableOpacity>
                <Icon color='black' name='ellipsis-vertical-sharp' size={24} iconFamily='Ionicons' />
            </TouchableOpacity>
        </View>
    )
}

export default RestaurantHeader