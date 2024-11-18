import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@unistyles/Constants'
import CustomText from '@components/global/CustomText'
import MainFodCard from '@components/restaurants/MainFodCard'
import NonCustomizableCard from '@components/checkout/NonCustomizableCard'

const OrderList: FC<{
  cartItems: any
  restaurant: any
  totalItemPrice: number
  totalItems: number
}> = ({ cartItems, restaurant, totalItemPrice, totalItems }) => {
  return (
    <View style={styles.container}>
        <View style={styles.flexRow}>
            <View style={styles.imgContainer}>
                <Image source={require('@assets/icons/clock.png')} style={styles.img} />
            </View>
            <View>
                <CustomText fontFamily='Okra-Bold' fontSize={12} style={{}}>
                   Delivering in 20-30 mins
                </CustomText>
                <CustomText fontFamily='Okra-Medium' fontSize={12} style={{ color: Colors.text }}>
                   Shipping of {totalItems} items
                </CustomText>
            </View>
        </View>
      {
        cartItems.map((item: any, index: number) => (
            <View style={styles.subContainer} key={index}>
               {item?.isCustomizable ?
               <>
              {item?.customization?.map((cus: any, index: number) => (
               <MainFodCard item={item} cus={cus} restaurant={restaurant} key={index} />
              ))}
               </>:
               <NonCustomizableCard item={item} restaurant={restaurant} />  
            }
            </View>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 15,
  },
  subContainer: {
    margin: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
  imgContainer: {
    backgroundColor: Colors.background_light,
    padding: 10,
    borderRadius: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:12,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
})

export default OrderList