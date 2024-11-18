import { ScrollView ,View,TouchableOpacity} from 'react-native'
import React, { FC } from 'react'
import { useStyles } from 'react-native-unistyles'
import { filtertyles } from '@unistyles/filterStyles'
import { Colors } from '@unistyles/Constants'
import Icon from '@components/global/Icon'
import CustomText from '@components/global/CustomText'

const SortingAndFilters:FC<{menuTitle:string,options:Record<string,any>}> = ({menuTitle,options}) => {
const {styles} = useStyles(filtertyles)
  return (
    <ScrollView horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.filterBar}>
     <TouchableOpacity style={styles.filterItem}>
        <View style={{transform:[{rotate: '90deg'}]}}>
            <Icon name='tune-vertical-variant' size={16} color={Colors.text} iconFamily='MaterialCommunityIcons'/>
        </View>
        <CustomText 
        variant='h6' 
        fontFamily='Okra-Medium' 
        fontSize={11} 
        color={Colors.text}
        style={{}}>{menuTitle}</CustomText>
        <Icon name='caret-down' size={16} color={Colors.text} iconFamily='Ionicons'/>
     </TouchableOpacity>
     {options?.map((i:string,index:number)=>{
        return(
            <TouchableOpacity key={index} style={styles.filterItem}>
                <CustomText variant='h6' fontFamily='Okra-Medium' fontSize={11} color={Colors.text} style={{}}>{i}</CustomText>
            </TouchableOpacity>
        )
     })}
    </ScrollView>
  )
}

export default SortingAndFilters