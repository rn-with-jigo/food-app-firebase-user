import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { navString } from './constants/navStrings'
import { ADDRESSSCREEN, CARTSCREEN, CHECKOUTSCEEEN, HOMESCREEN, LOADDERSCREEN, LOGINSCREEN, NEWADDRESSSCREEN, ORDERSTATUSSCREEN, PRODUCTDETAILSSCREEN, REGISTRATIONSCREEN, SPLASHSCREEN } from './screens/screens'
import TestApp from './screens/TestApp'

const AppNavigation = () => {
    const AppNav = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <AppNav.Navigator initialRouteName={navString.Splashscreen}>
                <AppNav.Screen component={SPLASHSCREEN} name={navString.Splashscreen} options={{ headerShown: false, headerBackButtonMenuEnabled: false, }} />
                <AppNav.Screen component={TestApp} name={"testApp"} 
                    options={{
                        headerTitleStyle: {
                            color:"#2B3A55"
                        }
                    }}
                />
                <AppNav.Screen component={LOGINSCREEN} name={navString.Login} options={{ headerShown: false, headerBackButtonMenuEnabled: false, }} />
                <AppNav.Screen component={REGISTRATIONSCREEN} name={navString.Registration} options={{ headerShown: false, headerBackButtonMenuEnabled: false, }} />
                <AppNav.Screen component={LOADDERSCREEN} name={navString.Loadder} options={{
                    headerShown: false, headerBackButtonMenuEnabled: false,
                    presentation: "transparentModal",
                    animation: 'fade'
                }} />
                <AppNav.Screen component={HOMESCREEN} name={navString.Homescreen} options={{
                    headerBackVisible: false,
                    // headerBackButtonMenuEnabled: false,
                }} />
                <AppNav.Screen component={CARTSCREEN} name={navString.Cart} options={{
                    title: "Cart",
                    
                }} />
                <AppNav.Screen component={CHECKOUTSCEEEN} name={navString.Checkout} options={{
                    title: "Checkout"
                }} />
                <AppNav.Screen component={ADDRESSSCREEN} name={navString.AddressScreen} options={{
                    title: "Address"
                }} />
                <AppNav.Screen component={NEWADDRESSSCREEN} name={navString.NewAddressScreen} options={{
                    title: "Add New Address",
                    presentation: "modal",
                }} />
                <AppNav.Screen component={ORDERSTATUSSCREEN} name={navString.OrderStatusScreen} options={{
                    headerBackVisible: false,
                    headerShown: false,
                    headerBackButtonMenuEnabled: false,
                }} />
                <AppNav.Screen component={PRODUCTDETAILSSCREEN} name={navString.ProductDetailsScreen} options={{
                    title: "Product Details"
                }} />
            </AppNav.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation