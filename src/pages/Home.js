import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

function Home (props) {
    const {} = props;
    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('consultaSaque')}
            />
        </View>
    )
}

export default Home;