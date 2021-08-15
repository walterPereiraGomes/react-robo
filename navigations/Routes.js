import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../src/pages/Home';
import ConsultaSaque from '../src/pages/ConsultaSaque';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ConsultaInvestimentoFuturo from '../src/pages/ConsultaInvestimentoFuturo';

const Stack = createNativeStackNavigator();



function Routes() {
    const { Navigator, Screen} = Stack;
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="DrawerComponent"
        >
        <Screen name="DrawerComponent" component={DrawerComponent} />
        </Navigator>
    );
}

const Drawer = createDrawerNavigator();

function DrawerComponent() {
    const { Navigator, Screen} = Drawer;
    return (
        <Navigator>
            <Screen name="Home" component={Home} />
            <Screen 
                name="consultaSaque"
                component={ConsultaSaque}
                options={{ title: 'Calculo de saque semanal' }}
            />
            <Screen 
                name="consultaInvestimentoFuturo"
                component={ConsultaInvestimentoFuturo}
                options={{ title: 'Consulta de Reinvestimento' }}
            />
        </Navigator>
    );
}

export default Routes;