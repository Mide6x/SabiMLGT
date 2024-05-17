import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ScanUploadScreen = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highestProbabilityTag, setHighestProbabilityTag] = useState(null);
  const [isClassified, setIsClassified] = useState(false);
  const [price, setPrice] = useState("");
  const [minOrderQuantity, setMinOrderQuantity] = useState("");

  const navigation = useNavigation();

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
      setIsClassified(false); // Reset classified state
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
      const apiUrl = "";
      const apiKey = "";

      const headers = {
        "Prediction-Key": apiKey,
        "Content-Type": "application/octet-stream",
      };

      const formData = new FormData();
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      const response = await axios.post(apiUrl, formData, { headers });

      const predictions = response.data.predictions;
      if (predictions && predictions.length > 0) {
        // Find the prediction with the highest probability
        const highestPrediction = predictions.reduce((prev, current) =>
          prev.probability > current.probability ? prev : current
        );
        setHighestProbabilityTag(highestPrediction.tagName);
        setIsClassified(true); // Set classified state to true
      } else {
        setHighestProbabilityTag("No predictions found");
      }
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
      setHighestProbabilityTag(null);
    }
  }, [image]);

  return (
    <View style={styles.container}>
      <Text style={styles.scanText}>Scan Upload Screen</Text>
      <Button
        title={isClassified ? "Upload New Image" : "Select Image"}
        onPress={selectImage}
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {!isClassified && (
        <Button
          title="Classify Image"
          onPress={classifyImage}
          disabled={isLoading}
        />
      )}
      {isLoading && <ActivityIndicator size="small" color="#B7B4B4" />}
      {highestProbabilityTag && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{highestProbabilityTag}</Text>
        </View>
      )}
      {isClassified && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Input price here"
            placeholderTextColor="#B7B4B4"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <TextInput
            style={styles.input}
            placeholder="Minimum order quantity"
            placeholderTextColor="#B7B4B4"
            value={minOrderQuantity}
            onChangeText={setMinOrderQuantity}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              navigation.navigate("UpdatedStore", {
                imageUri: image,
                tag: highestProbabilityTag,
                price,
                minOrderQuantity,
              })
            }
          >
            <Text style={styles.addButtonText}>Add Item to Store</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  resultContainer: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#193735",
    textAlign: "center",
  },
  scanText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#193735",
    marginBottom: 20,
  },
  image: {
    width: 309,
    height: 340,
    marginVertical: 10,
    borderRadius: 10,
  },
  input: {
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
    marginVertical: 10,
    color: "#193735",
    fontSize: 20,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#193735",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default ScanUploadScreen;
