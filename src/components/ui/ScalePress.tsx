import { View, Text, ViewStyle, TouchableOpacity, Animated } from 'react-native'
import React, { FC } from 'react'

interface ScalePressProps {
    children: React.ReactNode
    onPress: () => void
    onLongPress?: () => void
    style?: ViewStyle | ViewStyle[]
}

const ScalePress:FC<ScalePressProps> = ({ children, onPress, onLongPress, style }) => {
    const scaleValue = new Animated.Value(1)
    const onPressIn = () => {
        Animated.timing(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start()
    }
    const onPressOut = () => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            activeOpacity={1}
            style={{...style}}>
            <Animated.View style={{ transform: [{ scale: scaleValue },]}}>
                {children}
            </Animated.View>
        </TouchableOpacity>
    )
}

export default ScalePress