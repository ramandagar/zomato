import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect } from 'react'
import { replace } from '@utils/NavigationUtils'
import SoundPlayer from 'react-native-sound-player'
import { Colors } from '@unistyles/Constants'
import { screenWidth } from '@unistyles/Constants'
import LottieView from 'lottie-react-native'
import CustomText from '@components/global/CustomText'
import { useAppDispatch } from '@states/reduxHook'
import { useRoute } from '@react-navigation/native'
import { clearRestaurantCart } from '@states/reducers/cartSlice'

const OrderSuccesScreen:FC = () => {
    const route = useRoute() as any
    const dispatch = useAppDispatch()
    const restaurant = route?.params?.restaurant
    useEffect(() => {
        try {
            SoundPlayer.playAsset(require('@assets/sfx/confirm_sound.mp3'))
        } catch (error) {
            
        }
        const timeoutId = setTimeout(() => {
            replace('UserBottomTab')
            dispatch(clearRestaurantCart({
                restaurant_id: restaurant?.id
            })) 
        }, 3000)
        return () => clearTimeout(timeoutId)
    }, [])
    return (
        <View style={styles.container}>
            <LottieView
                source={require('@assets/animations/confirm.json')}
                style={styles.lottieView}
                autoPlay
                loop={false}
                speed={1}
                enableMergePathsAndroidForKitKatAndAbove={true}
                hardwareAccelerationAndroid
            />
            <CustomText fontFamily='Okra-Bold' fontSize={18} style={styles.orderPlacedText}>
                Order Placed
            </CustomText>
            <View style={styles.deliveryContainer}>
                <CustomText fontFamily='Okra-Bold' fontSize={12} style={styles.deliveryText}>
                    Delivery to Home
                </CustomText>
            </View>
            <CustomText fontFamily='Okra-Regular' fontSize={12} style={styles.addressText}>
                Pochinki Erangle({restaurant?.name})
            </CustomText>
        </View>
  )
}
const styles = StyleSheet.create({
    container: {
    justifyContent: 'center',
    alignItems: 'center',
        flex: 1,
    },
    lottieView: {
        width: screenWidth * 0.6,
        height: 150,
    },
    orderPlacedText: {
        opacity: 0.4,
    },
    deliveryContainer: {
        borderBottomWidth: 2,
        paddingBottom: 4,
        marginBottom: 5,
        borderColor: Colors. active,
    },
    deliveryText: {
        marginTop: 15,
        borderColor: Colors.active,
    },
    addressText: {
        opacity: 0.8,
    }
})

export default OrderSuccesScreen