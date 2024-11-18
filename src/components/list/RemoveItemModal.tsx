import { View, Text, ScrollView } from 'react-native'
import React, { FC, useEffect } from 'react'
import { selectRestaurantCartItem } from '@states/reducers/cartSlice'
import { useAppSelector } from '@states/reduxHook'
import { modelStyles } from '@unistyles/modelStyles'
import { useStyles } from 'react-native-unistyles'
import CustomText from '@components/global/CustomText'
import MainFodCard from '@components/restaurants/MainFodCard'

const RemoveItemModal: FC<{
  item: any
  closeModal: () => void
  restaurant: any
}> = ({ item, closeModal, restaurant }) => {
  const cartItem = useAppSelector(selectRestaurantCartItem(restaurant.id, item.id))   
  const {styles} = useStyles(modelStyles)

  useEffect(() => {
    if(!cartItem) {
      closeModal()
    }
  }, [cartItem])


  return (
    <View>
    <View style={styles.noShadowHeaderContainer}>
      <View style={styles.flexRowGap}>
        <CustomText 
        fontFamily='Okra-Bold'
          style={{}}
          fontSize={13}
        >
          Customizations for {item?.name}
          </CustomText>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainerWhiteBackground}>
        {cartItem?.customization?.map((cus: any) => (
          <MainFodCard 
            key={cus?.id}
            item={item}
            cus={cus}
            restaurant={restaurant}
          />
        ))}
      </ScrollView>
    </View>

  )
} 

export default RemoveItemModal