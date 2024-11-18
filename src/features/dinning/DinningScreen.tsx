import { View, Text, Image } from 'react-native'
import React, { FC } from 'react'
import { emptyStyles } from '@unistyles/emptyStyles';
import { useStyles } from 'react-native-unistyles';

const DinningScreen: FC = () => {
  const {styles} = useStyles(emptyStyles);
  return (
    <View style={styles.container(false)}>
      <Image source={require('@assets/images/coming_soon.jpg')} style={styles.emptyImage} />
    </View>
  )
}

export default DinningScreen