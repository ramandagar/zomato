import { View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { cardStyles } from '@unistyles/cardStyles'
import { useStyles } from 'react-native-unistyles'
import { recommendedListData } from '@utils/dummyData'
import ScalePress from '@components/ui/ScalePress'
import { navigate } from '@utils/NavigationUtils'
import CustomText from '@components/global/CustomText'
import { Colors } from '@unistyles/Constants'
import CustomGradient from '@components/global/CustomGradient'

const RecommendedList = () => {
  const { styles } = useStyles(cardStyles)
  const renderItem = ({ item }: any) => {
    return (
      <ScalePress style={styles.itemContainer}
        onPress={() => {
          navigate('RestaurantScreen', {
            item: item
          })
        }}
      >

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.itemImage}
          />
          {item?.discount && <View style={styles.discountContainer}>
            <CustomText style={{}} color={Colors.background} fontFamily='Okra-Medium'
              fontSize={12}>
              {item?.discount}
            </CustomText>
            {
              item?.discountAmount &&
              (
                <CustomText style={{}} color={Colors.background} fontFamily='Okra-Medium'
                  fontSize={9}>
                  {item?.discountAmount}
                </CustomText>)
            }
          </View>}
          <TouchableOpacity>
            <Image style={styles.bookmarkIconImage}
              source={require('@assets/icons/bookmark.png')} />
          </TouchableOpacity>
          <CustomGradient position='bottom'  />
        </View>
        <View style={styles.itemInfo}>
          <CustomText style={{}}
            color={Colors.text} fontFamily='Okra-Medium'
            fontSize={12}
            numberOfLines={1}
          >
            {item?.name}
          </CustomText>
          <View style={styles.flexRow}>
            <Image source={require('@assets/icons/clock.png')} style={styles.clockIcon}/>
            <CustomText style={{}}
              color={Colors.lightText} fontFamily='Okra-Medium'
              fontSize={9}
              numberOfLines={1}
            >
              {`${item?.time} | ${item?.distance}`}
            </CustomText>
          </View>
        </View>
      </ScalePress>
    )
  }


  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <FlatList
        numColumns={Math.ceil(recommendedListData.length / 2)}
        data={recommendedListData}
        renderItem={renderItem}
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        style={styles.recommendedContainer}
      />
    </ScrollView>
  )
}

export default RecommendedList