// import { View, Text, Image, FlatList } from 'react-native'
// import React from 'react'
// import { restaurantStyles } from '@unistyles/restuarantStyles'
// import { useStyles } from 'react-native-unistyles'
// import ScalePress from '@components/ui/ScalePress'
// import { cardStyles } from '@unistyles/cardStyles'
// import { ScrollView } from 'react-native-collapsible-tab-view'
// import { regularFoodData } from '@utils/dummyData'

// const RegularFoodList = () => {
//   const { styles } = useStyles(cardStyles)

//   const renderItem = ({ item }: any) => {
//     return (
//       <ScalePress style={styles.itemContainer}>
//           <Image source={{ uri: item?.imageUrl }} style={styles.regularFoodContainer}/>

//       </ScalePress>
//     )
//   }
//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//       <FlatList
//         numColumns={Math.ceil(regularFoodData.length / 2)}
//         data={regularFoodData}
//         renderItem={renderItem}
//         scrollEnabled={false}
//         keyExtractor={(_: any,index: any) => String(index)}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.listContainer}
//         style={styles.recommendedContainer}
//       />
//     </ScrollView>
//   )
// }

// export default RegularFoodList

import { View, Text, Image, FlatList,ScrollView } from 'react-native'
import React from 'react'
import { restaurantStyles } from '@unistyles/restuarantStyles'
import { useStyles } from 'react-native-unistyles'
import ScalePress from '@components/ui/ScalePress'
import { cardStyles } from '@unistyles/cardStyles'
import { regularFoodData } from '@utils/dummyData'


const RegularFoodList = () => {
  const { styles } = useStyles(cardStyles)
  const renderItem = ({ item }: any) => {
    return (
      <ScalePress style={styles.itemContainer} onPress={() => {}}>
        <Image source={{ uri: item?.imageUrl }} style={[
          styles.regularFoodContainer,
          {
            height:100,
            width:100
          }
          ]} />
      </ScalePress>
    )
  }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        numColumns={Math.ceil(regularFoodData.length / 2)}
      data={regularFoodData}
      renderItem={renderItem}
      scrollEnabled={false}
      keyExtractor={(_: any, index: any) => String(index)}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
        style={styles.recommendedContainer}
      />
    </ScrollView>
  )
}

export default RegularFoodList