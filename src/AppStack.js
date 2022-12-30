import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { navString } from './constants/navStrings'
import { HOMESCREEN, LOADDERSCREEN, LOGINSCREEN, REGISTRATIONSCREEN, SPLASHSCREEN } from './screens/screens'

const AppNavigation = () => {
    const AppNav = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <AppNav.Navigator initialRouteName={navString.Splashscreen}>
                <AppNav.Screen component={SPLASHSCREEN} name={navString.Splashscreen} options={{ headerShown: false, headerBackButtonMenuEnabled: false, }} />
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
            </AppNav.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation