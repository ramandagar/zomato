import { View, Text, Image } from 'react-native'
import React ,{FC} from 'react'
import { restaurantStyles } from '@unistyles/restuarantStyles'
import { useStyles } from 'react-native-unistyles'
import ScalePress from '@components/ui/ScalePress'
import CustomText from '@components/global/CustomText'
import StarRating from '@components/ui/StarRating'
import DottedLine from '@components/ui/DottedLine'

const RestaurantCard:FC<{item:any}> = ({item}) => {
  const { styles } = useStyles(restaurantStyles)
  return (
    <ScalePress onPress={() => {}}>
      <View style={styles.card}>
        <View>
          <Image source={{ uri: item?.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.info}>
         <View style={styles.textContainer}>
          <View style={styles.textPart}>
            <CustomText
             variant='h5'
             style={styles.name}
             numberOfLines={1}
             fontFamily='Okra-Bold'

            >{item?.name}</CustomText>
            <CustomText
             variant='h5'
             style={{}}
             fontFamily='Okra-Regular'

            >{item?.time} • {item?.distance} • 150₹ for one</CustomText>
          </View>
          <StarRating rating={item?.rating} />

         </View>
         <DottedLine/>
         {item?.discount && (
          <CustomText variant='h5' fontFamily='Okra-Bold' style={{}}>
            {item?.discount}•{item?.discountAmount && ``}
          </CustomText>
         )}
        </View>
      </View>
    </ScalePress>
  )
}

export default RestaurantCard