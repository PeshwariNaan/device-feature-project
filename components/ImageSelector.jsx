import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Colors from "../constants/Colors";

const ImageSelector = (props) => {
  const [pickedImage, setPickedImage] = useState();
  
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA); // If I wanted the gallery I would use CAMERA_ROLL here instead
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!!",
        "You need to grant permission for this app to use the camera",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takePictureHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // allows to crop image
      aspect: [16, 9],
      quality: 0.5, //The top value is one for higher res images
    });
    console.log(image);
    setPickedImage(image.uri);
    props.onTakeImage(image.uri)

  };

  return (
    <View style={styles.pictureTaker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet...</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take picture"
        color={Colors.primary}
        onPress={takePictureHandler}
      />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  pictureTaker: {
    alignItems: "center",
    marginBottom: 15

  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
