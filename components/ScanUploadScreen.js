import React, { useState } from "react";
import { View, Text, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker

const ScanUploadScreen = () => {
  const [image, setImage] = useState(null);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please enable camera access");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      // Call your model to classify the image here
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Scan Upload Screen</Text>
      <Button title="Select Image" onPress={selectImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      {/* Add fields for price and minimum order quantity here */}
    </View>
  );
};

export default ScanUploadScreen;
