import { View, Text, StyleSheet, Platform, ScrollView, Image, SafeAreaView } from 'react-native'
import { FC, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { restaurantHeaderStyles } from '@unistyles/restuarantStyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStyles } from 'react-native-unistyles/lib/typescript/src/useStyles'
import { useAppDispatch, useAppSelector } from '@states/reduxHook'
import { clearRestaurantCart, selectRestaurantCart } from '@states/reducers/cartSlice'
import { goBack, replace } from '@utils/NavigationUtils'
import { Colors } from '@unistyles/Constants'
import CheckoutHeader from './CheckoutHeader'
import OrderList from '@components/list/OrderList'
import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'
import { RFValue } from 'react-native-responsive-fontsize'
import BillDetails from '@components/checkout/BillDetails'
import ArrowButton from '../../components/checkout/ArrowButton'

const CheckoutScreen: FC = () => {
  const route = useRoute() as any
  const dispatch = useAppDispatch()
  const restaurant = route?.params?.item
  const cart = useAppSelector(selectRestaurantCart(restaurant?.id))
  const totalItemPrice = cart?.reduce((total: number, item: any) => total + (item.cartPrice || 0), 0) || 0
  const totalItems = cart?.reduce((total: number, item: any) => total + (item.quantity || 0), 0) || 0
  const insets = useSafeAreaInsets()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!cart || cart.length === 0) {
      goBack()
    }
  }, [cart])


  const handlePlaceOrder = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      replace('OrderSuccessScreen',{
        restaurant: restaurant,
      })
      dispatch(clearRestaurantCart({
        restaurant_id: restaurant?.id
      })) 
    }, 3000)
  }

  return (
    <View style={styles.container}>
      <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />
      <CheckoutHeader title={restaurant?.name} />
      <ScrollView style={styles.scrollContainer}>
        <OrderList cartItems={cart} restaurant={restaurant} totalItemPrice={totalItemPrice} totalItems={totalItems} />
        <View style={styles.flexRowBetween}>
          <View style={styles.flexRow}>
            <Image
              source={require('@assets/icons/coupon.png')}
              style={{ width: 25, height: 25 }}
            />
            <CustomText variant='h6' fontFamily='Okra-Medium' fontSize={12} style={{}}>
              View all restaurant coupons
            </CustomText>
          </View>
          <Icon
            name='chevron-right'
            size={RFValue(16)}
            color={Colors.text}
            iconFamily='MaterialCommunityIcons'
          />
        </View>
        <BillDetails totalItemPrice={totalItemPrice} />
        <View style={styles.flexRowBetween}>
          <View>
            <CustomText variant='h6' fontFamily='Okra-Bold' fontSize={12} style={{ color: Colors.text }}>
              Cancelletion Policy
            </CustomText>
            <CustomText variant='h6' fontFamily='Okra-Medium' fontSize={12} style={styles.cancelText}>
              Once order is placed,{'\n'} it cannot be cancelled
            </CustomText>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
      <View style={styles.paymentGateway}>
        <View style={{ width: '30%' }}>
             <CustomText variant='h6' fontFamily='Okra-Bold' fontSize={12} style={{ color: Colors.text }}>
              Pay Using
            </CustomText>
            <CustomText variant='h6' fontFamily='Okra-Bold' fontSize={12} style={{ color: Colors.text }}>
              Cash on Delivery
            </CustomText>
        </View>
        <View style={{ width: '70%' }}>
          <ArrowButton
          loading={loading} 
          price={totalItemPrice} 
          title='Place Order' 
          onPress={handlePlaceOrder} />
        </View>
      </View>
      <SafeAreaView/>
    </View>
  )
}

const styles = StyleSheet.create({
  cancelText: {
    marginTop: 4,
    opacity: 0.6
  },
  paymentGateway: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 14,
    paddingTop: 10,
    bottom: Platform.OS === 'android' ? 40 : undefined
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    padding: 10,
    backgroundColor: Colors.background_light
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  }
})

export default CheckoutScreen
