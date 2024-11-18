import { View, Text, Platform } from 'react-native'
import React, { FC } from 'react'
import { homeStyles } from '@unistyles/homeStyles'
import { useStyles } from 'react-native-unistyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useSharedState } from '@features/tabs/SharedContext'
import HeaderSection from '@components/home/HeaderSection'
import Graphics from '@components/home/Graphics'
import MainList from '@components/list/MainList'

const DeliveryScreen: FC = () => {
  const insets = useSafeAreaInsets()
  const { styles } = useStyles(homeStyles)
  const { scrollYGlobal, scrollY } = useSharedState()

  const backgroundColorChanges = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [1, 50], [0, 1])
    return {
      backgroundColor: `rgba(255,255,255,${opacity})`
    }
  })

  const moveUpStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: interpolate(
          scrollYGlobal.value, [0, 50], [0, -50],
          Extrapolation.CLAMP
        )
      }]
    }
  })

  return (
    <View style={styles.container}>
      <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />
      <Animated.View style={[moveUpStyle]}>
        <Graphics />
        <Animated.View style={[backgroundColorChanges, styles.topHeader]}>
          <HeaderSection />
        </Animated.View>
        <MainList />
      </Animated.View>
    </View>
  )
}

export default DeliveryScreen