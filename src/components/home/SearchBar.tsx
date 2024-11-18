import { View, Text, TouchableOpacity, Pressable, Image } from 'react-native'
import React from 'react'
  import { useAppDispatch, useAppSelector } from '@states/reduxHook'
import { homeStyles } from '@unistyles/homeStyles'
import { useStyles } from 'react-native-unistyles'
import { useSharedState } from '@features/tabs/SharedContext'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { Colors } from '@unistyles/Constants'
import Icon from '@components/global/Icon'
import RollingContent from 'react-native-rolling-bar'
import CustomText from '@components/global/CustomText'
import { setIsVegMode } from '@states/reducers/userSlice'


const searchItems: string[] = ['Veg', 'Non-Veg', 'All']

const SearchBar = () => {
    const dispatch = useAppDispatch()
    const isVegMode = useAppSelector(state => state.user.isVegMode)
    const { styles } = useStyles(homeStyles)
    const { scrollYGlobal } = useSharedState()

    const textColorAnimation = useAnimatedStyle(() => {
        const textColor = interpolate(
            scrollYGlobal.value, [0, 80], [255, 0]
        )
        return {
            color: `rgb(${textColor},${textColor},${textColor})`
        }
    })

    return (
        <>
            <View style={[styles.flexRowBetween, styles.padding]}>
                <TouchableOpacity
                    style={styles.searchInputContainer} activeOpacity={0.8}
                >
                    <Icon name='search' size={18} color={isVegMode ? Colors.active : Colors.primary} iconFamily='Ionicons' />
                    <RollingContent
                        interval={3000}
                        customStyle={[styles.textContainer,styles.rollingText]}
                    >
                        {searchItems.map((item, index) => (
                            <CustomText
                                key={index}
                                fontSize={12}
                                style={textColorAnimation}
                                fontFamily='Okra-Medium'
                            >
                                {item}
                            </CustomText>
                        ))}
                    </RollingContent>
                        <Icon name='mic-outline'
                        size={18}
                        color={isVegMode ? Colors.active : Colors.primary}
                        iconFamily='Ionicons'
                    />
                </TouchableOpacity>

                <Pressable
                    style={styles.vegMode}
                    onPress={() => dispatch(setIsVegMode(!isVegMode))}>
                    <Animated.Text style={[textColorAnimation, styles.animatedText]} >
                        VEG
                    </Animated.Text>
                    <Animated.Text style={[textColorAnimation, styles.animatedSubText]}>
                        MODE
                    </Animated.Text>
                    <Image
                        source={isVegMode ?
                            require('@assets/icons/switch_on.png') :
                            require('@assets/icons/switch_off.png')}
                        style={styles.switch}
                    />
                </Pressable>
            </View>
        </>
    )
}

export default SearchBar