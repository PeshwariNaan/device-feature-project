import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import * as placeActions from "../store/places-actions";
import Colors from "../constants/Colors";
import ImageSelector from "../components/ImageSelector";
import LocationSelector from "../components/LocationSelector";


const NewPlaceScreen = (props) => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();

  const titleChangeHandler = (text) => {
    // I could add validation here but I won't use it
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(placeActions.addPlace(titleValue, selectedImage));
    props.navigation.goBack();
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImageSelector onTakeImage={imageTakenHandler} />
        <LocationSelector/>
        <Button
          style={styles.button}
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  button: {},
});
