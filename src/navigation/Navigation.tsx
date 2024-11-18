import SplashScreen from "@features/auth/SplashScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "@features/auth/LoginScreen";
import { navigationRef } from "@utils/NavigationUtils";
import UserBottomTab from "@features/tabs/UserBottomTab";
import AnimatedTabs from "@features/tabs/AnimatedTabs";
import RestaurantScreen from "@features/restaurants/RestaurantScreen";
import CheckoutScreen from "@features/checkout/CheckoutScreen";
import OrderSuccesScreen from "@features/checkout/OrderSuccesScreen";
const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator 
            screenOptions={{
                headerShown: false,
            }}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
                <Stack.Screen name="OrderSuccessScreen" component={OrderSuccesScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} 
                options={{
                    animation: "fade",
                }}
                />
                <Stack.Screen name="UserBottomTab" component={AnimatedTabs} />
                <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;