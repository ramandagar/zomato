import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { useAppDispatch } from '@states/reduxHook'
import { cartStyles } from '@unistyles/cartStyles'
import { useStyles } from 'react-native-unistyles'
import { clearRestaurantCart } from '@states/reducers/cartSlice'
import CustomText from '@components/global/CustomText'
import { Colors } from '@unistyles/Constants'
import Icon from '@components/global/Icon'
import { navigate } from '@utils/NavigationUtils'
import { RFValue } from 'react-native-responsive-fontsize'

const CartItem: React.FC<{ item: any }> = ({ item }) => {
  const dispatch = useAppDispatch()
  const { styles } = useStyles(cartStyles)
  const deleteCart = async (id: any) => {
    await dispatch(clearRestaurantCart({ restaurant_id: id }))
  }

  const totalItems = useMemo(() => {
    return item.items.reduce(
      (acc:any, item:any) => {
        acc += item.quantity
        return acc;
      },
      0
    )
  }, [item])



  return (

    <View style={styles.cartItemContainer}>
      <View style={styles.flexRowGap}>
        <Image source={{ uri: item.restaurant.imageUrl }}
          style={styles.image} />
        <View>
          <CustomText
            fontSize={10}
            fontFamily='Okra-Medium'
            style={{}}
          >{item.restaurant.name}</CustomText>
          <TouchableOpacity style={styles.flexRow} onPress={() => {
            navigate('RestaurantScreen', {
              item: item?.restaurant
            })
          }}>
            <CustomText
              fontSize={10}
              fontFamily='Okra-Medium'
              style={{
                top: -1
              }}
              color={Colors.active}
            >View Menu
              <Icon name='chevron-right' size={10} color={Colors.active} iconFamily='MaterialIcons' />
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.flexRowGap}>
        <TouchableOpacity
          onPress={() => {
            navigate('CheckoutScreen', {
      item:item.restaurant
    })
  }}
  style={styles.cartButton}>
    <CustomText 
    fontSize={10} 
    fontFamily='Okra-Bold' 
    style={{}}
    color={Colors.active_light}
   
    >View Cart</CustomText>
    <CustomText 
    fontSize={10} 
    fontFamily='Okra-Bold' 
    style={{}}
    color={Colors.active_light}
   
    >{totalItems} item</CustomText>
  </TouchableOpacity>
  <TouchableOpacity style={styles.closeButton}
    onPress={() => {
      deleteCart(item.restaurant.id)
    }}
  >
    <Icon
      name='close'
      size={RFValue(12)}
      iconFamily='MaterialCommunityIcons'
      color='#444'
    />
  </TouchableOpacity>
              
</View>
    </View>
  )
}

export default CartItem