import { View, Text, Platform } from 'react-native'
import React, { FC } from 'react'
import { homeStyles } from '@unistyles/homeStyles';
import { useStyles } from 'react-native-unistyles';
import LottieView from 'lottie-react-native';

const Graphics:FC = () => {
  const {styles} = useStyles(homeStyles);
  return (
    <View style={[styles.lottieContainer]} pointerEvents='none'>
      <LottieView 
        style={{
          height: '100%',
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          // bottom: 0
        }}
        source={require('@assets/animations/event.json')} 
        autoPlay
        loop
        hardwareAccelerationAndroid
      />
    </View>
  )
}

export default Graphics