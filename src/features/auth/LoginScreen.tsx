import { View, Text, Image, StatusBar, Platform, Animated, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { loginStyles } from '@unistyles/authStyles';
import { useStyles } from 'react-native-unistyles';
import { FadeInDown } from 'react-native-reanimated';
import CustomText from '@components/global/CustomText';
import BreakerText from '@components/ui/BreakerText';
import PhoneInput from '@components/ui/PhoneInput';
import { Colors } from '@unistyles/Constants';
import SocialLogin from '@components/ui/SocialLogin';
import { resetAndNavigate } from '@utils/NavigationUtils';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';

const LoginScreen = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { styles: loginStyle } = useStyles(loginStyles)

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      resetAndNavigate('UserBottomTab')
    }, 2000);
  }

  useEffect(() => {
    if(keyboardOffsetHeight === 0){
        Animated.timing(animatedValue,{
            toValue:0,
            duration:500,
            useNativeDriver:true
        }).start();
    }else{
      Animated.timing(animatedValue,{
        toValue:-keyboardOffsetHeight * 0.25,
        duration:500,
        useNativeDriver:true
      }).start();
    }
  }, [keyboardOffsetHeight])

  return (
    <View style={loginStyle.container}>
      <StatusBar hidden={Platform.OS !== "android"} />
      <Image
        source={require('@assets/images/login.png')}
        style={loginStyle.cover}
      />
      <Animated.ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={{transform:[{translateY:animatedValue}]}}
        contentContainerStyle={loginStyle.bottomContainer}
      >
        <CustomText
          variant='h5'
          fontFamily='Okra-Medium'
          style={loginStyle.title}
        >
          India's #1 Food Delivery App and Dinning App
        </CustomText>
        <BreakerText text='Log in or sign up' />

        <PhoneInput 
          onFocus={() => { }}
          onBlur={() => { }}
          onChangeText={setPhone}
          value={phone}
        />

        <TouchableOpacity style={loginStyle.buttonContainer} disabled={loading} onPress={handleLogin} activeOpacity={0.8}>
          {loading ?
            <ActivityIndicator size='small' color="#fff" />
            :
            <CustomText style={[]} variant='h6' fontFamily='Okra-Medium' color='#fff'>Continue</CustomText>
          }
        </TouchableOpacity>

        <BreakerText text="or"/>
        <SocialLogin/>

      </Animated.ScrollView>
      <View style={loginStyle.footer}>  
        <CustomText style={[]} variant='h6' fontFamily='Okra-Medium' color={Colors.lightText}>
          By continuing, you agree to our
          </CustomText>
          <View style={loginStyle.footerTextContainer}>
            <CustomText style={loginStyle.footerText} variant='h6' fontFamily='Okra-Medium'  >Terms of Service</CustomText>
            <CustomText  style={loginStyle.footerText} variant='h6' fontFamily='Okra-Medium'  >Privacy Policy</CustomText>
            <CustomText  style={loginStyle.footerText} variant='h6' fontFamily='Okra-Medium'  >Content Policy</CustomText>

          </View>
        </View>


    </View>
  )
}

export default LoginScreen