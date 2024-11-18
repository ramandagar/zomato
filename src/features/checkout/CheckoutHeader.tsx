import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@unistyles/Constants'
import Icon from '@components/global/Icon'
import CustomText from '@components/global/CustomText'
import { goBack } from '@utils/NavigationUtils'

const CheckoutHeader: FC<{
  title: any
}> = ({ title }) => {
  return (
    <SafeAreaView>
      <View style={styles.flexRow}>
        <View style={styles.flexRowGap}>
          <Pressable onPress={() => goBack()}>
            <Icon iconFamily='Ionicons' name='chevron-back' size={16} color={Colors.dark} />
          </Pressable>
          <View>
            <CustomText fontFamily='Okra-Bold' fontSize={11} style={styles.text}>
              {title}
            </CustomText>
            <CustomText fontFamily='Okra-Medium' fontSize={10} style={styles.text2}>
              Delivering to Pochinki Erangel
            </CustomText>
          </View>

        </View>
        <View>
          <Icon iconFamily='Ionicons' name='share-outline' size={20} color={Colors.primary} />
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'space-between',
    padding: 10,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.6,
    borderColor: Colors.border,
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  text2: {
    textAlign: 'left',
    opacity: 0.5
  },
  text: {
    textAlign: 'left',
  }
  })

export default CheckoutHeader
