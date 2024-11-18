import { TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import Icon from '@components/global/Icon'
import { Colors } from '@unistyles/Constants'
import CustomText from '@components/global/CustomText'

const BackToTopButton:FC<{onPress:() => void}> = ({onPress} ) => {
  return (
    <TouchableOpacity onPress={onPress}
      style={{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
      }}
    >
      <Icon name='arrow-up-circle' size={24} color='#fff' iconFamily='Ionicons' />
      <CustomText 
      variant='h6' fontFamily='Okra-Bold' 
      fontSize={12} color='#fff' style={{}}>Back to top</CustomText>
    </TouchableOpacity>
  )
}

export default BackToTopButton