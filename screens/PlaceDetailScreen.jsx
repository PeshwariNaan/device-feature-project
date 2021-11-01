import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PlaceDetailScreen = (props) => {
    return (
        <View>
            <Text>Place Details screen</Text>
        </View>
    )
}

PlaceDetailScreen.navigationOptions = naveData => {
    return {
        headerTitle: naveData.navigation.getParam('placeTitle')
    }
}

export default PlaceDetailScreen

const styles = StyleSheet.create({})
