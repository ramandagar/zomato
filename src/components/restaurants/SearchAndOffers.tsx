import { View, Text, TouchableOpacity, Animated, Platform } from 'react-native'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useStyles } from 'react-native-unistyles';
import { searchStyles } from '@unistyles/restuarantStyles';
import { useAppSelector } from '@states/reduxHook';
import { selectRestaurantCart } from '@states/reducers/cartSlice';
import Icon from '@components/global/Icon';
import { Colors } from '@unistyles/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/global/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import { navigate } from '@utils/NavigationUtils';
import AnimatedNumber from 'react-native-animated-numbers';
import RollingBar from 'react-native-rolling-bar';
const searchItems: string[] = [
  'Search "chai samosa"',
  'Search "Cake"',
  'Search "ice cream"',
  'Search "pizza"',
  'Search "Biryani"',
];
const SearchAndOffers: FC<{ item: any }> = ({ item }) => {
  const { styles } = useStyles(searchStyles)
  const cart = useAppSelector(selectRestaurantCart(item?.id))
  const summary = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        acc.totalPrice += item?.cartPrice || 0;
        acc.totalItems += item?.quantity;
        return acc;
      },
      { totalPrice: 0, totalItems: 0 }
    )
  }, [cart])

  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [showOffer, setShowOffer] = useState(summary.totalItems > 0);
  const [showConfetti, setShowConfetti] = useState(false);
  const hasShownCongrats = useRef(false);
  useEffect(() => {
    if (summary?.totalItems > 0) {
      setShowOffer(true)
      Animated.timing(slideAnim, {
toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(() => setShowOffer(false))
    }
    if (summary?.totalPrice > 500 && !showConfetti && !hasShownCongrats.current) {
    setShowConfetti(true)
    hasShownCongrats.current = true;
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true
        }),
      ]),
      { iterations: 2 }
    ).start()
  } else if (summary.totalPrice <= 500) {
    setShowConfetti(false)
    hasShownCongrats.current = false;
    scaleAnim.setValue(1)
  }
}, [summary.totalItems, summary.totalPrice])
const translateY = slideAnim.interpolate({
  inputRange: [0, 1],
  outputRange: [50, 0]
})

return (
  <View style={[styles.container]}>
    <View style={[styles.flexRowBetween, styles.padding]}>
      <TouchableOpacity style={styles.searchInputContainer} activeOpacity={0.8}>
        <Icon size={20} iconFamily='Ionicons' name='search' color={Colors.active} />
        <RollingBar interval={3000} defaultStyle={false} customStyle={styles.textContainer}>
          {searchItems?.map((item, index) => {
            return (
              <CustomText
                style={styles.rollingText}
                key={index}
                fontSize={12}
              >
                {item}
              </CustomText>
            )
          })}
        </RollingBar>
      </TouchableOpacity>
      <TouchableOpacity style={styles.flexRowGap}>
        <Icon size={20} iconFamily='MaterialCommunityIcons' name='silverware-fork-knife' color={Colors.background} />
        <CustomText style={{}} color={Colors.background} fontSize={12} fontFamily='Okra-Bold'>Offers</CustomText>
      </TouchableOpacity>
    </View>
    {showOffer && <Animated.View style={{
      transform: [{ translateY }], marginTop: -20
    }}>
      <LinearGradient
        colors={showConfetti ? ['#3a7bd5', '#3a6073'] : ['#e9425e', '#9145b6']}
        style={styles.offerContainer}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1.2 }}
        >
          <View style={{
            padding:15,
            paddingBottom:Platform.OS == 'ios' ? 25 : 15,
            paddingHorizontal:20
          }}>
          {showConfetti && (
            <LottieView
              source={require('@assets/animations/confetti_2.json')}
              style={styles.confetti}
              autoPlay
              loop
              onAnimationFinish={() => {
                setShowConfetti(false)
              }}
            />
          )}
          <TouchableOpacity style={styles.offerContent} activeOpacity={0.8}
          onPress={() => {
            navigate('CheckoutScreen', {
              item: item
            })
          }}>
          <AnimatedNumber
            includeComma={false}
            animationDuration={300}
            animateToNumber={summary?.totalItems}
            fontStyle={styles.animatedCount}
          />
          <CustomText style={styles.offerText}>{` item${summary?.totalItems > 1 ? 's' : ''}`} added</CustomText>
          <Icon size={20} iconFamily='MaterialCommunityIcons' name='arrow-right-circle' color='#fff' />
        </TouchableOpacity> 
        <Animated.Text style={[
          styles.offerSubtitle, {
            transform: [{ scale: scaleAnim }]
          }]}>
          {summary?.totalPrice > 500 ?
            'Congratulations! You get an extra 15% OFF!' :
            `Add items worth ${Math.max(1, 500 - summary?.totalPrice)} more to get extra`
          }
        </Animated.Text>
        </View>
      </LinearGradient >
    </Animated.View >} 
  </View >
)
}

export default SearchAndOffers