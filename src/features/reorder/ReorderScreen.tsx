import { View, Text, Image } from 'react-native'
import React, { FC } from 'react'
import { emptyStyles } from '@unistyles/emptyStyles';
import { useStyles } from 'react-native-unistyles';

const ReorderScreen: FC = () => {
  const {styles} = useStyles(emptyStyles);
  return (
    <View style={styles.container(false)}>
      <Image source={require('@assets/images/coming_soon3.png')} style={styles.emptyImage} />
    </View>
  )
}

export default ReorderScreen