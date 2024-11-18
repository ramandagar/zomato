import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC, memo, useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@states/reduxHook'
import { addCustomizableItem, removeCustomizableItem, selectRestaurantCartItem } from '@states/reducers/cartSlice'
import { foodStyles } from '@unistyles/foodStyles'
import { useStyles } from 'react-native-unistyles'
import { modelStyles } from '@unistyles/modelStyles'
import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'
import AnimatedNumber from 'react-native-animated-numbers'
import { Colors } from '@unistyles/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
 
import CustomModal from '@components/modal/CustomModal'
import EditItemModal from '@components/modal/EditItemModal'

const MainFodCard: FC<{
  item: any,
  cus: any,
  restaurant: any
}> = ({ item, cus, restaurant }) => {
  const dispatch = useAppDispatch()
  const cartItem = useAppSelector(selectRestaurantCartItem(restaurant.id, item.id))
  const modalRef = useRef<any>(null)
  const { styles } = useStyles(modelStyles)


  const openEditModal = useCallback(() => {
    modalRef.current?.openModal(
      <EditItemModal onClose={() => modalRef.current?.closeModal()} item={item} cus={cus} restaurant={restaurant} />
    )
  }, [])

  const addCartHandler = (cus: any) => {
    const data = {
      restaurant: restaurant,
      item: item,
      customization: {
        quantity: 1,
        price: cus?.price,
        customizationOptions: cus?.customizationOptions,
        id: cus?.id
      }
    }
    dispatch(addCustomizableItem(data))
  }

  const removeCartHandler = (cus: any) => {
    const data = {
      restaurantId: restaurant.id,
      itemId: item.id,
      customizationId: cus?.id
    }
    dispatch(removeCustomizableItem(data))
  }


  return (
    <>
      <CustomModal ref={modalRef} />
      <View style={styles.flexRowItemBaseline}>
        <View style={styles.flexRowGapBaseline}>
          <Image
            style={styles.vegIcon}
            source={cartItem?.isVeg ?
              require('@assets/icons/veg.png') :
              require('@assets/icons/non_veg.png')}
          />
          <View>
            <CustomText
              fontFamily='Okra-Bold'
              fontSize={12}
              style={{}}
            >
              {cartItem?.name}
            </CustomText>
            <CustomText
              fontFamily='Okra-Bold'
              fontSize={11}
              style={{}}
            >
              Rs. {cartItem?.price}
            </CustomText>
            <CustomText
              fontFamily='Okra-Medium'
              fontSize={10}
              style={{}}
            >
              {cus?.customizationOptions?.map(
                (option: any, idx: number) => (
                  <CustomText
                    fontFamily='Okra-Medium'
                    fontSize={10}
                    style={{}}
                    color='#444'
                  >
                    {option?.selectedOption?.name},
                  </CustomText>
                )
              )}
            </CustomText>
            <TouchableOpacity style={styles.flexRow} onPress={openEditModal}>
              <CustomText fontFamily='Okra-Medium' fontSize={12} style={{ color: '#444' }}>Edit</CustomText>
              <View style={{ bottom: -1 }}>
                <Icon name='arrow-right' size={16} color='#888' iconFamily='MaterialIcons' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cartOperationContainer}>
          <View style={styles.miniAddButtonContainer}>
            <TouchableOpacity onPress={() => removeCartHandler(cus)}>
              <Icon name='minus-thick'
                size={RFValue(16)}
                color={Colors.active}
                iconFamily='MaterialCommunityIcons'
              />
            </TouchableOpacity>
            <AnimatedNumber
              animateToNumber={cus?.quantity}
              fontStyle={styles.miniAnimatedCount}
              animationDuration={300}
              includeComma={false}
            />
            <TouchableOpacity onPress={() => addCartHandler(cus)}>
              <Icon name='plus-thick' size={16} color={Colors.active} iconFamily='MaterialCommunityIcons' />
            </TouchableOpacity>

          </View>
          <CustomText fontFamily='Okra-Medium' fontSize={12} style={{}}>
            Rs.{cus?.cartPrice}
          </CustomText>
        </View>
      </View>
    </>
  )
}

export default memo(MainFodCard)