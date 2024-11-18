import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { modelStyles } from '@unistyles/modelStyles'
import { useStyles } from 'react-native-unistyles'
import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'
import { Colors } from '@unistyles/Constants'
import DottedLine from '@components/ui/DottedLine'
import ScalePress from '@components/ui/ScalePress'
import AnimatedNumber from 'react-native-animated-numbers'
import { RFValue } from 'react-native-responsive-fontsize'
import { SafeAreaView } from 'react-native-safe-area-context'
 import { updateCustomizableItem } from '@states/reducers/cartSlice'
import { useAppDispatch } from '@states/reduxHook'


const transformSelectedOptions = (
  selectedOptions: any,
  customizationOptions: any
) => {
  return Object.entries(selectedOptions).map(([type, index]) => {
    const customization = customizationOptions.find((option: any) => option.type === type)
    if (!customization || !customization.options[index as number]) {
      throw new Error(`Invalid customization type or index for ${type}`)
    }
    return {
      type,
      selectedOption: customization?.options[index as number]
    }
  })
}

const EditItemModal: FC<{ 
  onClose: () => void, 
  item: any, 
  restaurant: any,
  cus: any
}> = ({ onClose, item, restaurant, cus }) => {
  const dispatch = useAppDispatch()
  const [data, setData] = useState({
    quantity: cus?.quantity,
    price: cus?.price,
    selectedOptions: {} as Record<string, number>
  })

  useEffect(() => {
    const defaultSelectedOptions: Record<string, number> = {}
    cus?.customizationOptions.forEach((cusOption: any) => {
      const itemCustomization = item?.customizationOptions.find((itemOption: any) => itemOption.type === cusOption.type)
      if(itemCustomization){
        const selectedIndex = itemCustomization.options.findIndex(
          (option: any) => option.name === cusOption.selectedOption.name
        )
        if(selectedIndex !== -1){
          defaultSelectedOptions[cusOption.type] = selectedIndex
        }
      }
    })
    setData((prev) => ({ 
      ...prev, 
      selectedOptions: defaultSelectedOptions, 
    }))
  }, [])

  const { styles } = useStyles(modelStyles)

  const addCartHandler = () => {
    setData((prevData)=>
      ({
        ...prevData,
        quantity: prevData.quantity + 1,
        price: calculatePrice(prevData?.quantity + 1, prevData?.selectedOptions)
      })
    )
  }
  const removeCartHandler = () => {
    if(data.quantity > 1){
      setData((prevData)=>
        ({
          ...prevData,
          quantity: prevData.quantity - 1,
          price: calculatePrice(prevData?.quantity - 1, prevData?.selectedOptions)
        })
      )
    }else{
      onClose()
    }
  }

  const updateItemIntoCart = async() => {
    const customizationOptions = transformSelectedOptions(
      data.selectedOptions, item.customizationOptions).sort(
        (a,b)=>a.type.localeCompare(b.type)
      )

      const customizedData = {
        restaurantId:restaurant.id,
        itemId:item.id,
        customizationId:cus?.id,
        newCustomization:{
          quantity:data?.quantity,
          price:data?.price,
          customizationOptions:customizationOptions
        }
      }
      dispatch(updateCustomizableItem(customizedData))
      onClose()
  }

  const calculatePrice = (quantity: number, selectedOption: Record<string, number>) => {
    let basePrice = item.price || 0
    let customizationPrice = 0
    Object.keys(selectedOption).forEach((type) => {
      const optionIndex = selectedOption[type]
      const optionPrice = item.customizationOptions.find((c: any) => c.type === type)?.options[optionIndex]?.price || 0
      customizationPrice += optionPrice
    })
    return (basePrice + customizationPrice) * quantity
  }

  const selectOptionHandler = (type: string, index: number) => {
    setData((prevData)=>{
      const updatedSelectedOptions = { ...prevData.selectedOptions, [type]: index }
      const updatedPrice = calculatePrice(prevData?.quantity, updatedSelectedOptions)
      return { ...prevData, selectedOptions: updatedSelectedOptions, price: updatedPrice }
    })
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.flexRowGap}>
          <Image source={{ uri: item.image }} style={styles.headerImage} />
          <View>
            <CustomText fontFamily='Okra-Medium' fontSize={12} style={{}}>{item.name}</CustomText>
            <CustomText fontFamily='Okra-Medium' fontSize={10} style={{}}>Edit</CustomText>
          </View>
        </View>
        <View style={styles.flexRowGap}>
          <TouchableOpacity style={styles.icon} onPress={onClose}>
            <Icon name='bookmark-outline' size={20} color={Colors.primary} iconFamily='Ionicons' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={onClose}>
            <Icon name='share-outline' size={20} color={Colors.primary} iconFamily='Ionicons' />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {item?.customizationOptions?.map((customization: any, index: number) => (
          <View style={styles.subContainer}>
            <CustomText fontFamily='Okra-Medium' fontSize={12} style={{}}>{customization.type}</CustomText>
            <CustomText fontFamily='Okra-Medium' fontSize={12} style={{}}>
              {customization?.required ? 'Required any 1 option ' : 'Add on your own'}
            </CustomText>
            <DottedLine />
            {customization?.options?.map((option: any, i: number) => (
              <TouchableOpacity style={styles.optionContainer} key={i} onPress={()=>selectOptionHandler(customization.type, i)}>
                <CustomText fontFamily='Okra-Medium' fontSize={11} style={{}}>
                  {option.name}
                </CustomText>
                <View style={styles.flexRowGap}>
                  <CustomText fontFamily='Okra-Medium' fontSize={11} style={{}}>
                    Rs {option?.price}
                    {console.log(option)}
                  </CustomText>
                  <Icon
                    name={data.selectedOptions[customization.type] === i ? 'radiobox-marked' : 'radiobox-blank'}
                    size={16}
                    color={data.selectedOptions[customization.type] === i ? 'green' : '#888'}
                    iconFamily='MaterialCommunityIcons'
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.selectedContainer}>
          <ScalePress onPress={removeCartHandler}>
            <Icon iconFamily='MaterialCommunityIcons' name='minus-thick' size={RFValue(13)} color='green' />
          </ScalePress>
          <AnimatedNumber
            animateToNumber={data?.quantity}
            fontStyle={styles.animatedCount}
            animationDuration={300}
            includeComma={false}
          />
          <ScalePress onPress={addCartHandler}>
            <Icon iconFamily='MaterialCommunityIcons' name='plus-thick' size={RFValue(13)} color='green' />
          </ScalePress>
        </View>
        <TouchableOpacity style={styles.addButtonContainer} onPress={updateItemIntoCart}>
          <CustomText color='white' fontFamily='Okra-Medium' fontSize={12} variant='h5' style={{}}>Update item - Rs {data.price}</CustomText>
        </TouchableOpacity>
        <SafeAreaView />
      </View>
    </View>
  )
}

export default EditItemModal
