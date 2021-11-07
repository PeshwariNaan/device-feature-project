import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Platform, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = (props) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const selectLocationHandler = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const saveLocationHandler = useCallback(() => {
      if(!selectedLocation) {
          //Could show an alert
          return
      }
    props.navigation.navigate('NewPlace', {pickedLocation: selectedLocation})
  }, [selectedLocation])

  useEffect(() => {      
      props.navigation.setParams({saveLocation: saveLocationHandler})      
  }, [saveLocationHandler])

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
    console.log(markerCoordinates);
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
    const saveFn = navData.navigation.getParam('saveLocation')
  return {
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton}>
        <Text style={styles.headerButtonText} onPress={saveFn}>SAVE</Text>
      </TouchableOpacity>
    ),
  };
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white': Colors.primary
  },
  headerButton: {
      marginHorizontal: 20,
  }

});
