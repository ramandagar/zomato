import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC, memo, useCallback } from 'react'
import { useAppDispatch } from '@states/reduxHook'
import { modelStyles } from '@unistyles/modelStyles'
import { useStyles } from 'react-native-unistyles'
import { addItemToCart, removeItemFromCart } from '@states/reducers/cartSlice'
import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'
import { Colors } from '@unistyles/Constants'
import AnimatedNumber from 'react-native-animated-numbers'

const NonCustomizableCard: FC<{
  item: any,
  restaurant: any
}> = ({ item, restaurant }) => {
  const dispatch = useAppDispatch()
  const { styles } = useStyles(modelStyles)

  const addCartHandler = useCallback(() => {
    dispatch(addItemToCart({
      restaurant: restaurant,
      item: { ...item, customization: [] }
    }))
  }, [dispatch, restaurant.id, item])

  const removeCartHandler = useCallback(() => {
    dispatch(removeItemFromCart({
      restaurantId: restaurant.id,
      itemId: item.id
    }))
  }, [dispatch, restaurant.id, item])
  return (
    <View style={styles.flexRowItemBaseline}>
      <View style={styles.flexRowGapBaseline}>
        <Image
          style={styles.vegIcon}
          source={item?.isVeg ?
            require('@assets/icons/veg.png') :
            require('@assets/icons/non_veg.png')}
        />
        <View>
          <CustomText fontFamily='Okra-Bold' fontSize={12} style={{}}>
            {item?.name}
          </CustomText>
          <CustomText fontFamily='Okra-Bold' fontSize={12} style={{}}>
            {item?.price}
          </CustomText>
        </View>
      </View>
      <View style={styles.cartOperationContainer}>
        <View style={styles.miniAddButtonContainer}>
          <TouchableOpacity onPress={removeCartHandler}>
            <Icon iconFamily='MaterialCommunityIcons' name='minus' size={16} color={Colors.active} />
          </TouchableOpacity>
          <AnimatedNumber
            animateToNumber={item?.quantity}
            fontStyle={styles.miniAnimatedCount}
            includeComma={true}
            animationDuration={1000}
          />
          <TouchableOpacity onPress={addCartHandler}>
            <Icon iconFamily='MaterialCommunityIcons' name='plus' size={16} color={Colors.active} />
          </TouchableOpacity>
        </View>
        <CustomText fontFamily='Okra-Medium' fontSize={12} style={{}}>
          {item?.cartPrice}
        </CustomText>
      </View>
    </View>
  )
}

export default memo(NonCustomizableCard)