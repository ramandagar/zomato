import { View, Text, SectionList, NativeScrollEvent, NativeSyntheticEvent, ViewToken } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import ExploreSection from '@components/home/ExploreSection'
import RestaurantList from './RestaurantList'
import { restaurantStyles } from '@unistyles/restuarantStyles'
import { useSharedState } from '@features/tabs/SharedContext'
import { useStyles } from 'react-native-unistyles'
import Animated, { withTiming, useAnimatedStyle } from 'react-native-reanimated'
import ScalePress from '@components/ui/ScalePress'
import BackToTopButton from '@components/ui/BackToTopButton'
import CustomText from '@components/global/CustomText'
import SortingAndFilters from '@components/home/SortingAndFilters'
import { filtersOption } from '@utils/dummyData'


const seactionedData = [
  {
    title: 'Explore',
    data: [{}],
    renderItem: () => <ExploreSection />
  },
  {
    title: 'Restaurants',
    data: [{}],
    renderItem: () => <RestaurantList />
  }
]

const MainList: FC = () => {
  const { styles } = useStyles(restaurantStyles)
  const { scrollY, scrollToTop, scrollYGlobal } = useSharedState()
  const previousScrollYTopButton = useRef<number>(0)
  const prevScrollY = useRef(0)
  const sectionListRef = useRef<SectionList>(null)

  const [isRestaurantVisible, setIsRestaurantVisible] = useState(false)
  const [isNearEnd, setIsNearEnd] = useState(false)

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y
    const isScrollingDown = currentScrollY > prevScrollY.current

    scrollY.value = isScrollingDown ? 1 : 0

    scrollYGlobal.value = currentScrollY
    prevScrollY.current = currentScrollY

    const containerHeight =
      event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const offset = event?.nativeEvent?.contentOffset?.y;

    setIsNearEnd(offset + layoutHeight >= containerHeight - 500)
  }

  const handleScrollToTop = () => {
    scrollToTop()
    sectionListRef.current?.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
      animated: true,
      viewPosition: 0
    })
  }

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp = scrollYGlobal.value < previousScrollYTopButton.current && scrollYGlobal.value > 180
    const opacity = withTiming(isScrollingUp && (isRestaurantVisible || isNearEnd) ? 1 : 0, { duration: 300 })
    const translateY = withTiming(isScrollingUp && (isRestaurantVisible || isNearEnd) ? 0 : 10, { duration: 300 })

    previousScrollYTopButton.current = scrollYGlobal.value
    return {
      opacity,
      transform: [{ translateY }]
    }
  })

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 80
  }

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const restaurantVisible = viewableItems.some(
      (item) => item?.section?.title === 'Restaurants' && item.isViewable
    )
    setIsRestaurantVisible(restaurantVisible)
  }
 
  return (
    <>
    <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
     <BackToTopButton onPress={handleScrollToTop}/>
    </Animated.View>
      <SectionList
        sections={seactionedData}
        ref={sectionListRef}
        overScrollMode='always'
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        renderSectionHeader={({section}) =>{
          if(section.title!== 'Restaurants'){
            return null
          }
          return(
            <Animated.View style={[isRestaurantVisible || isNearEnd ? styles.shadowBottom : {}]}>
              <SortingAndFilters menuTitle='Sort' options={filtersOption}/>
            </Animated.View>
          )
        }}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={styles.listContainer}
        stickySectionHeadersEnabled={true}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </>
  )
}

export default MainList