import { FlatList, View,Image } from 'react-native'
import React from 'react'
import { restaurantStyles } from '@unistyles/restuarantStyles'
import { useStyles } from 'react-native-unistyles'
import { cardStyles } from '@unistyles/cardStyles'
import CustomText from '@components/global/CustomText'
import { recommendedListData } from '@utils/dummyData'
import ScalePress from '@components/ui/ScalePress'
import RestaurantCard from './RestaurantCard'

const RestaurantList = () => {
  const { styles } = useStyles(cardStyles)

  const renderItem = ({ item }: any) => {
    return (
     <RestaurantCard item={item} />
    )
  }
  return (
    <View>
      <CustomText 
          style={styles.centerText} fontFamily='Okra-Bold'>
            1092 restraunts delevring to you
        </CustomText> 
        <CustomText 
          style={styles.centerText} fontFamily='Okra-Regular'>
            FEATURED RESTAURANTS
        </CustomText> 

        <FlatList
          data={recommendedListData}
          scrollEventThrottle={16}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
    </View>
  )
}

export default RestaurantList