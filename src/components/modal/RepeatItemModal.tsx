import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { FC } from 'react'
import { selectRestaurantCartItem } from '@states/reducers/cartSlice'
import { useAppSelector } from '@states/reduxHook'
import { modelStyles } from '@unistyles/modelStyles'
import { useStyles } from 'react-native-unistyles'
import CustomText from '@components/global/CustomText'
import { Colors } from '@unistyles/Constants'
import MainFodCard from '@components/restaurants/MainFodCard'

const RepeatItemModal: FC<{
    item: any,
    restaurant: any,
    onOpenAddModal: () => void,
    closeModal: () => void
}> = ({ item, restaurant, onOpenAddModal, closeModal }) => {
    const cartItem = useAppSelector(selectRestaurantCartItem(restaurant.id, item.id))
    const { styles } = useStyles(modelStyles)
    return (
        <View>
            <View style={styles.noShadowHeaderContainer}>
                <View style={styles.flexRowGap}>
                    <CustomText fontFamily='Okra-Bold' fontSize={12} style={{}}>{item.name}</CustomText>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainerWhiteBackground}>
                {cartItem?.customization?.map((cus: any, index: number) => (
                   <MainFodCard item={item} cus={cus} key={index} restaurant={restaurant}/>
                ))}
            </ScrollView>
            <View style={styles.noShadowFooterContainer}>
                    <TouchableOpacity onPress={onOpenAddModal}>
                        <CustomText fontFamily='Okra-Bold' fontSize={12} style={{ color: Colors.active }}>+ Add new customization</CustomText>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default RepeatItemModal