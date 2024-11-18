import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@unistyles/Constants'
import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'

interface ArrowButtonProps {
  loading: boolean
  price: number
  title: string
  onPress: () => void
}

const ArrowButton: FC<ArrowButtonProps> = ({ loading, price, title, onPress }) => {
  return (
    <TouchableOpacity disabled={loading} style={[styles.btn, { justifyContent: price != 0 ? 'space-between' : 'center' }]} onPress={onPress}>
      {price != 0 && price &&
        <View>
          <CustomText fontFamily='Okra-Bold' fontSize={12} style={{ color: Colors.active_light }}>
            Rs {price + 34}.0
          </CustomText>
          <CustomText fontFamily='Okra-Bold' fontSize={12} style={{ color: Colors.active_light }}>
            Total
          </CustomText>
        </View>
      }
      <View style={styles.flexRow}>
        <CustomText fontFamily='Okra-Bold' fontSize={12} style={{ color: Colors.active_light }}>
          {title}
        </CustomText>
        {loading ? <ActivityIndicator size='small' color={Colors.active_light} /> :
          <Icon iconFamily='Ionicons' name='chevron-forward' size={20} color={Colors.active_light} />
        }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.active,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default ArrowButton