import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { homeStyles } from '@unistyles/homeStyles'
import { useStyles } from 'react-native-unistyles'
import CustomText from '@components/global/CustomText'
import { Colors } from '@unistyles/Constants'
import Icon from '@components/global/Icon'
import RecommendedList from '@components/list/RecommendedList'
import BreakerText from '@components/ui/BreakerText'
import RegularFoodList from '@components/list/RegularFoodList'

const ExploreSection = () => {
  const [tabSelected, setSelectedTab] = useState(1)
  const { styles } = useStyles(homeStyles)
  return (
    <View style={styles.topHidingContainer}>
      <View style={styles.flexRowCenter}>
        <Pressable
          style={styles.leftTab(tabSelected === 1)}
          onPress={() => setSelectedTab(1)}
        >
          <CustomText
            color={tabSelected == 1 ? Colors.text : Colors.lightText}
            fontFamily="Okra-Medium"
            style={{}}
          >
            Recommended
          </CustomText>
        </Pressable>
        <Pressable
          style={styles.rightTab(tabSelected === 2)}
          onPress={() => setSelectedTab(2)}
        >
          <Icon
            name="bookmark-outline"
            size={20}
            iconFamily="Ionicons"
            color={tabSelected == 2 ? Colors.text : Colors.lightText}
          />
          <CustomText
            color={tabSelected == 1 ? Colors.text : Colors.lightText}
            fontFamily="Okra-Medium"
            style={{}}
          >
            Collections
          </CustomText>
        </Pressable>
      </View>

      <RecommendedList />

      <BreakerText text="WHAT'S ON YOUR MIND"/>
      <RegularFoodList />
      <BreakerText text="ALL RESTAURANTS"/>

    </View>
  )
}

export default ExploreSection