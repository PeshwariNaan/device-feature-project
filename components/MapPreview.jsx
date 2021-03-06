import React from "react";
import {  TouchableOpacity, StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import ENV from "../env.js";

const MapPreview = (props) => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
  }

  return (
  <TouchableOpacity style={{...styles.mapPreview, ...props.style}} onPress={props.onPress} >
  {props.location ? <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }}  /> : props.children}
  </TouchableOpacity>
  )
};

export default MapPreview;

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    mapImage: {
        width: '100%',
        height: '100%'
    }
});
