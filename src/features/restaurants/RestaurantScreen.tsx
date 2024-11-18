import { View, Text, Platform, FlatList } from 'react-native'
import React, { FC } from 'react'
import { useRoute } from '@react-navigation/native'
import { restaurantHeaderStyles } from '@unistyles/restuarantStyles'
import { useStyles } from 'react-native-unistyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HeaderSection from '@components/home/HeaderSection'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import RestaurantHeader from '@components/restaurants/RestaurantHeader'
import SortingAndFilters from '@components/home/SortingAndFilters'
import { restaurantItemsData, restaurantsItemfiltersOption } from '@utils/dummyData'
import DottedLine from '@components/ui/DottedLine'
import CustomText from '@components/global/CustomText'
import FoodCard from '@components/restaurants/FoodCard'
import SearchAndOffers from '@components/restaurants/SearchAndOffers'

const RestaurantScreen: FC = () => {
    const route = useRoute() as any
    const restaurant = route.params?.item
    const { styles } = useStyles(restaurantHeaderStyles)
    const insets = useSafeAreaInsets()


    const renderItem = ({ item }: { item: any }) => {
        return (
            <View>
                <FoodCard item={item} restaurant={restaurant} />
            </View>
        )
    }

    return (
        <>
            <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />
            <CustomSafeAreaView>
                <RestaurantHeader title={restaurant?.name} />
                <View style={styles.sortingContainer}>
                    <SortingAndFilters menuTitle='Filter' options={restaurantsItemfiltersOption} />
                </View>
                <FlatList
                    data={restaurantItemsData}
                    renderItem={renderItem}
                    scrollEventThrottle={16}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                        return <View style={styles.mainPadding}>
                            <DottedLine />
                        </View>
                    }}
                />
            </CustomSafeAreaView>
            <SearchAndOffers item={restaurant} />
        </>
    )
}

export default RestaurantScreen