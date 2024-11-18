import { Image, Linking, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useAppSelector } from '@states/reduxHook'
import { useSharedState } from './SharedContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStyles } from 'react-native-unistyles'
import { tabStyles } from '@unistyles/tabStyles'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Colors, screenWidth } from '@unistyles/Constants'
import ScalePress from '@components/ui/ScalePress'
import { DeliveryTabIcon, DinningTabIcon, LiveTabIcon, ReorderTabIcon } from './TabIcon'
import CartHOC from '@features/checkout/CartHOC'

const CustomTabBar: FC<BottomTabBarProps> = (props) => {
  const isVegMode = useAppSelector((state) => state.user.isVegMode)
  const { scrollY } = useSharedState()

  const { state, descriptors, navigation } = props
  const { bottom } = useSafeAreaInsets()

  const { styles } = useStyles(tabStyles)
  const isLiveTabFocused = state.routes[state.index]?.name === 'Live'

  // Animate tab bar slide up/down based on scroll
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(scrollY.value === 1 ? 100 : 0, { duration: 300 })
        }
      ]
    }
  })
 
  const indicatorStyle = useAnimatedStyle(() => {
    const baseLeft = 10
    let slideValue = state.index === 3 ? 0.22 :state.index === 2 ? 0.225 :0.24
    return {
      left: withTiming(baseLeft + (state.index * screenWidth * slideValue))
    }
  })

  return (
    <>
    {!isLiveTabFocused && <CartHOC item={null}/>}
      <Animated.View style={[styles.tabBarContainer, animatedStyle, {
        paddingBottom: bottom,
        backgroundColor: isLiveTabFocused ? Colors.dark : Colors.background
      }]}>
        <View style={styles.tabContainer}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })

              if (!isFocused && !event.defaultPrevented) {
                // Use navigate with params to ensure proper navigation
                navigation.navigate({
                  name: route.name,
                  params: route.params,
                  merge: true,
                })
              }
            }

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              })
            }

            return (
              <ScalePress
                key={route.key} // Use route.key instead of index
                style={[styles.tabItem, ]}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                {route.name === 'Delivery' && <DeliveryTabIcon focused={isFocused} />}
                {route.name === 'Live' && <LiveTabIcon focused={isFocused} />}
                {route.name === 'Reorder' && <ReorderTabIcon focused={isFocused} />}
                {route.name === 'Dinning' && <DinningTabIcon focused={isFocused} />}
              </ScalePress>
            )
          })}
          <View style={styles.verticalLine} />
        </View>

        <Animated.View style={[
          styles.slidingIndicator,
          indicatorStyle,
          {
            backgroundColor: isLiveTabFocused ? '#fff' : isVegMode ? Colors.active : Colors.primary
          }
        ]} />


        <TouchableOpacity style={styles.blinkitLogoContainer} onPress={()=>{
          Linking.openURL('https://blinkit.com')
        }}>
          <Image source={require('@assets/icons/blinkit.png')} style={styles.blinkitLogo}/>
        </TouchableOpacity>
      </Animated.View>
    </>
  )
}

export default CustomTabBar