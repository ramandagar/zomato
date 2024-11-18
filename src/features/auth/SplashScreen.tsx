import { View, Text, StatusBar, Platform, Image } from 'react-native'
import React, { useEffect } from 'react'
import { FC } from 'react'
import { useStyles } from 'react-native-unistyles'
import { splashStyles } from '@unistyles/authStyles'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, FadeInDown } from 'react-native-reanimated'
import CustomText from '@components/global/CustomText'
import { navigationRef, resetAndNavigate } from '@utils/NavigationUtils'

const SplashScreen: FC = () => {
  const { styles: splashStyle } = useStyles(splashStyles);

 useEffect(()=>{
    const timeoutID = setTimeout(()=>{
        resetAndNavigate('LoginScreen')
    }, 3000)

    return () => clearTimeout(timeoutID)
 }, [])



  return (
    <View style={splashStyle.container}>
      <StatusBar hidden={Platform.OS !== "android"} />
      <Image
        source={require('@assets/images/logo_t.png')}
        style={splashStyle.logoImage}
      />

      <Animated.View style={splashStyle.animatedContainer} entering={FadeInDown.delay(100).duration(200)}>
        <Image source={require('@assets/images/tree.png')} style={splashStyle.treeImage} />

        <CustomText
          variant='h5'
          style={splashStyle.msgText}
          fontFamily='Okra-Medium'
          color='#fff'
        >
          Carbon and Plastic Neutral Deliveries
        </CustomText>
      </Animated.View>
    </View>
  )
}

export default SplashScreen