import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'
import { Colors } from '@unistyles/Constants'

const getRatingColor = (rating:number) => {
  if(rating >= 4) return '#1C653C'
  if(rating >= 3) return '#128145'
  if(rating >= 2) return '#e67e22'
  if(rating >= 1) return '#e95492'
  return '#fff'
}

const StarRating:FC<{rating:number}> = ({rating}) => {
    const backgroundColor = getRatingColor(rating)
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <CustomText
      variant='h5'
      fontFamily='Okra-Bold'
      fontSize={12}
      color='#fff'
      style={{}}
      >{rating}</CustomText>
      <Icon name='star' size={12} color='#fff' iconFamily='MaterialIcons' />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        paddingVertical:8,
        borderRadius:10,
        gap:5,
        paddingHorizontal:10,
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default StarRating