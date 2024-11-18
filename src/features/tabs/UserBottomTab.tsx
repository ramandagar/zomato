import DeliveryScreen from '@features/delivery/DeliveryScreen';
import DinningScreen from '@features/dinning/DinningScreen';
import LiveScreen from '@features/live/LiveScreen';
import ReorderScreen from '@features/reorder/ReorderScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const UserBottomTab:React.FC = () => {
    return (
        <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        
        screenOptions={{headerShown:false,tabBarHideOnKeyboard:true}}>
            <Tab.Screen name='Delivery' component={DeliveryScreen}/>
            <Tab.Screen name='Dinning' component={DinningScreen}/>
            <Tab.Screen name='Live' component={LiveScreen}/>
            <Tab.Screen name='Reorder' component={ReorderScreen}/>   
        </Tab.Navigator>
    )
}


export default UserBottomTab;