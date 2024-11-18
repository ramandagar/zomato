import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import Animated,{ interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useSharedState } from '@features/tabs/SharedContext'
import { useStyles } from 'react-native-unistyles'
import { homeStyles } from '@unistyles/homeStyles'
import Icon from '@components/global/Icon'
import CustomText from '@components/global/CustomText'
import { SafeAreaView } from 'react-native-safe-area-context'

const LocationHeader: FC = () => {
  const {scrollYGlobal} = useSharedState()
  const {styles} = useStyles(homeStyles);
  const textColor = '#fff'
  const opacityFadingStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollYGlobal.value, [0, 80], [1, 0])
    return {
      opacity: opacity
    }
  })
  return (
    <Animated.View style={[opacityFadingStyles]}>
      <View style={{height: 50}}/>
        <View style={styles.flexRowBetween}>
          <View style={styles.flexRowGap}>
            <Icon name='map-marker' size={28} color={textColor} iconFamily='MaterialCommunityIcons' />
          <View>
          <TouchableOpacity style={styles.flexRow}>
            <CustomText 
              variant='h5'
              color={textColor}
              fontFamily='Okra-Bold'
              style={{}}
            >
            Erangel pochinki
            </CustomText>
            <Icon 
              name='chevron-down' 
              size={24} 
              color={textColor} 
              iconFamily='MaterialCommunityIcons' 
            />
          </TouchableOpacity>
          <CustomText
            variant='h7'
              color={textColor}
              fontFamily='Okra-Medium'
              style={{}}
            >
            Lucknow, Uttar Pradesh
          </CustomText>
        </View>
        </View>
       


      <View style={styles.flexRowGap}>
        <TouchableOpacity style={styles.translation}>
          <Image source={require('@assets/icons/translation.png')} 
            style={styles.translationIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileAvatar}>
          <Image 
            source={require('@assets/icons/golden_circle.png')} 
            style={styles.goldenCircle}
          />
           <Image 
            source={require('@assets/images/user.jpg')} 
            style={styles.profileImage}
          />
        </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

export default LocationHeader