import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const ScanUploadScreen = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [classificationResult, setClassificationResult] = useState(null);

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

    console.log("ImagePicker result: ", result); // Debugging log

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log("Selected image URI: ", uri); // Debugging log
      setImage(uri);
    } else {
      console.log("Image selection was cancelled or no assets found."); // Debugging log
    }
  };

  const classifyImage = async () => {
    if (!image) {
      Alert.alert("Please select an image first");
      return;
    }

    setIsLoading(true);

    try {
      const base64Image = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const data = {
        Inputs: {
          WebServiceInput0: [
            {
              image: `data:image/jpeg;base64,${base64Image}`,
              id: 134,
              category: "unknown",
            },
          ],
        },
        GlobalParameters: {},
      };

      const apiUrl =
        "http://79ca65b6-7beb-416a-9f62-8e649e0c294f.eastus2.azurecontainer.io/score";
      const apiKey = "cPy8D0fS7BTVMTDc34WHnZiVrKhM1nNW";

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      const response = await axios.post(apiUrl, data, { headers });

      setClassificationResult(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "An error occurred during classification. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (image) {
      setClassificationResult(null);
    }
  }, [image]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Scan Upload Screen</Text>
      <Button title="Select Image" onPress={selectImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginVertical: 10 }}
        />
      )}
      <Button
        title="Classify Image"
        onPress={classifyImage}
        disabled={isLoading}
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {classificationResult && (
        <View>
          <Text>Classification Result:</Text>
          <Text>{JSON.stringify(classificationResult, null, 2)}</Text>
        </View>
      )}
    </View>
  );
};

export default ScanUploadScreen;
