import DeliveryFocused from '@assets/tabicons/delivery_focused.png'
import Delivery from '@assets/tabicons/delivery.png'
import ReorderFocused from '@assets/tabicons/reorder_focused.png'
import Reorder from '@assets/tabicons/reorder.png'
import LiveFocused from '@assets/tabicons/live_focused.png'
import Live from '@assets/tabicons/live.png'
import DinningFocused from '@assets/tabicons/dining_focused.png'
import Dinning from '@assets/tabicons/dining.png'


import CustomText from "@components/global/CustomText"
import { Colors } from "@unistyles/Constants"
import { FC, memo } from "react"
import { Image } from "react-native"
import { View, ViewStyle } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { RootState } from '@states/store'
import { useSelector } from 'react-redux'
import { useAppSelector } from '@states/reduxHook'

interface TabProps {
    name: string
}

interface IconProps {
    focused: boolean
}

const styles = {
    width: RFValue(18),
    height: RFValue(18)
}

const tabStyles: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center'
}

const textStyleInActive = {
    textAlign: 'center',
    marginTop: 4,
    color: Colors.lightText,
    fontSize: RFValue(10)
}

const textStyleActive = {
    textAlign: 'center',
    marginTop: 4,
    color: Colors.active,
    fontSize: RFValue(10)
}

const TabIcon: FC<TabProps> = memo(({ name }) => {
    return (
        <View style={tabStyles}>
            <Image source={name === 'Delivery' ?
                Delivery : name === 'Dinning' ?
                    Dinning : name === 'Live' ?
                        Live : Reorder

            }
            style={[styles]}
            />
            <CustomText variant="h6" style={textStyleInActive as any}>
                {name}
            </CustomText>
        </View>
    )
})

const TabIconFocused: FC<TabProps> = memo(({ name }) => {
    const isVegMode = useAppSelector((state)=>state.user.isVegMode)
    return (
        <View style={tabStyles}>
            <Image source={name === 'Delivery' ?
            DeliveryFocused : name === 'Dinning' ?
                DinningFocused : name === 'Live' ?
                    LiveFocused : ReorderFocused
        }
            style={[styles,{tintColor:(name==='Live')?undefined:isVegMode?Colors.active:Colors.primary}]}
        />
        <CustomText variant="h6" style={textStyleActive as any}>
            {name}
            </CustomText>
        </View>
    )
})


export const DeliveryTabIcon: FC<IconProps> = memo(({ focused }) => {
    return focused ? <TabIconFocused name="Delivery" /> : <TabIcon name="Delivery" />
})

export const DinningTabIcon: FC<IconProps> = memo(({ focused }) => {
    return focused ? <TabIconFocused name="Dinning" /> : <TabIcon name="Dinning" />
})

export const LiveTabIcon: FC<IconProps> = memo(({ focused }) => {
    return focused ? <TabIconFocused name="Live" /> : <TabIcon name="Live" />
})


export const ReorderTabIcon: FC<IconProps> = memo(({ focused }) => {
    return focused ? <TabIconFocused name="Reorder" /> : <TabIcon name="Reorder" />
})