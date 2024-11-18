import { View, Text } from 'react-native'
import React from 'react'
import LocationHeader from './LocationHeader'
import Graphics from './Graphics'
import SearchBar from './SearchBar'

const HeaderSection = () => {
  return (
    <View>
      <LocationHeader />
      <SearchBar />
    </View>
  )
}

export default HeaderSection