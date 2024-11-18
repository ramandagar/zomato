import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@unistyles/Constants'
import CustomText from '@components/global/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from '@components/global/Icon'

const ReportItem: FC<{
  iconName: any
  title: string
  underline: boolean,
  price: number
}> = ({ iconName, title, underline, price }) => {
  return (
    <View style={[styles.flexRowBetween, { marginBottom: 10 }]}>
      <View style={styles.flexRow}>
        <Icon iconFamily='MaterialIcons' name={iconName} size={RFValue(16)} color={Colors.lightText} />
        <CustomText variant='h6' fontFamily='Okra-Medium' fontSize={12} style={{ textDecorationLine: underline ? 'underline' : 'none',textDecorationStyle:'dashed' }}>
          {title}
        </CustomText>
      </View>
      <CustomText variant='h6' fontFamily='Okra-Medium' fontSize={12} style={{ color: Colors.text }}>
        Rs. {price}
      </CustomText>
    </View>
  )
}


const BillDetails: FC<{
  totalItemPrice: number
}> = ({ totalItemPrice }) => {
  return (
    <View style={styles.container}>
      <CustomText variant='h6' fontFamily='Okra-Bold' fontSize={12} style={styles.text}>
        Bill Details
      </CustomText>
      <View style={styles.billContainer}>
        <ReportItem iconName='article' title='Items total' underline={false} price={totalItemPrice} />
        <ReportItem iconName='pedal-bike' title='Delivery charge' underline={false} price={29} />
        <ReportItem iconName='shopping-bag' title='Handling charge' underline={false} price={29} />
        <ReportItem iconName='cloudy-snowing' title='Surge charge' underline={false} price={29} />
      </View>
      <View style={[styles.flexRowBetween, { marginBottom: 10 }]}>
        <CustomText variant='h6' fontFamily='Okra-Bold' fontSize={12} style={styles.text}>
          Subtotal
        </CustomText>
        <CustomText variant='h6' fontFamily='Okra-Bold' fontSize={12} style={styles.text}>
          Rs. {totalItemPrice}
        </CustomText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 10
  },
  text: {
    marginHorizontal: 10,
    marginTop: 15
  },
  billContainer: {
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.7
  },
  flexRowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  flexRow: {
    gap: 5,
    alignItems: 'center',
    flexDirection: 'row'
  }
})

export default BillDetails