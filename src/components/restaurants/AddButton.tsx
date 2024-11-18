import { View, TouchableOpacity } from 'react-native'
import React, { FC, memo, useCallback, useRef } from 'react'
import { useStyles } from 'react-native-unistyles'
import { foodStyles } from '@unistyles/foodStyles'
import { Colors } from '@unistyles/Constants'
import Icon from '@components/global/Icon'
import { useAppDispatch, useAppSelector } from '@states/reduxHook'
import { addItemToCart, removeCustomizableItem, removeItemFromCart, selectRestaurantCartItem } from '@states/reducers/cartSlice'
import CustomText from '@components/global/CustomText'
import ScalePress from '@components/ui/ScalePress'
import { RFValue } from 'react-native-responsive-fontsize'
import AnimatedNumber from 'react-native-animated-numbers'
import CustomModal from '@components/modal/CustomModal'
import AddItemModal from '@components/modal/AddItemModal'
import RepeatItemModal from '@components/modal/RepeatItemModal'
import RemoveItemModal from '@components/list/RemoveItemModal'

const AddButton: FC<{ item: any, restaurant: any }> = ({ item, restaurant }) => {
  const dispatch = useAppDispatch()
  const { styles } = useStyles(foodStyles)
  const cart = useAppSelector(selectRestaurantCartItem(restaurant.id, item.id))
  const modalRef = useRef<any>(null)

  const openAddModal = useCallback(() => {
    modalRef.current.openModal(
      <AddItemModal  onClose={() => modalRef.current.closeModal()} item={item} restaurant={restaurant} />
    )
  }, [])

    const openRepeatModal = useCallback(() => {
    modalRef.current.openModal(
      <RepeatItemModal item={item} onOpenAddModal={openAddModal} closeModal={() => modalRef.current.closeModal()} restaurant={restaurant} />
    )
  }, [])


  const addCartHandler = useCallback(() => {
    if (item?.isCustomizable) {
      if (cart !== null) {
        openRepeatModal()
        return
      }
      openAddModal()
    }
    else {
      dispatch(
        addItemToCart({ restaurant: restaurant, item: { ...item, customisation: [] } })
      )
    }
  }, [dispatch, restaurant, item, cart])



  const removeCartHandler = useCallback(() => {
    if (item?.isCustomizable) {
      console.log('cart?.customization', cart?.customization)
      if (cart?.customization && cart?.customization?.length >= 1) {
        openRemoveModal()
        return
      } else {
        dispatch(
          removeCustomizableItem({ 
            restaurantId: restaurant.id, 
            itemId: item?.id,
            customizationId: cart?.customization[0]?.id
          })
        )
      }
    }
    else {
      dispatch(
        removeItemFromCart({ restaurantId: restaurant.id, itemId: item?.id })
      )
    }
  }, [dispatch, restaurant, item])

  const openRemoveModal = () => {
    modalRef.current.openModal(
      <RemoveItemModal item={item} closeModal={() => modalRef.current.closeModal()} restaurant={restaurant} />
    )
  }

  return (
    <>
      <CustomModal ref={modalRef}  />
      <View style={styles.addButtonContainer(cart != null)}>
        {cart ? (
          <View style={styles.selectedContainer}>
            <ScalePress onPress={removeCartHandler}>
              <Icon name='minus-thick' size={RFValue(13)} color='#fff' iconFamily='MaterialCommunityIcons' />
            </ScalePress>
            <AnimatedNumber
              includeComma={false}
              animateToNumber={cart?.quantity}
              animationDuration={300}
              fontStyle={styles.animatedCount}
            />
            <ScalePress onPress={addCartHandler}>
              <Icon name='plus-thick' size={RFValue(13)} color='#fff' iconFamily='MaterialCommunityIcons' />
            </ScalePress>
          </View>
        ) : (
          <TouchableOpacity onPress={addCartHandler} style={styles.noSelectionContainer} activeOpacity={0.6} accessibilityLabel='Add Item to cart'>
            <CustomText fontFamily='Okra-Bold' color={Colors.primary} variant='h5' style={{}}>
              Add
            </CustomText>
            <CustomText fontFamily='Okra-Bold' color={Colors.primary} variant='h5' style={styles.plusSmallIcon}>
              +
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
      {
        item?.isCustomizable &&
        <CustomText fontFamily='Okra-Medium' style={styles.customizeText}>
          Customizable
        </CustomText>
      }
    </>
  )
}

export default memo(AddButton)