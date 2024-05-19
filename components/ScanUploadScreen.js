import React, { useState, useEffect } from "react";
import {
  View,
  Text,
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
      Alert.alert("Permission required", "Please enable photos access");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
      setIsClassified(false); // Reset classified state
      classifyImage(uri); // Automatically classify the image
    }
  };

  const classifyImage = async (imageUri) => {
    setIsLoading(true);

    try {
      const apiUrl =
        "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/add4ee45-cfd3-44cb-b971-711b1c48dfc8/classify/iterations/SabiimgClassification_Iteration4/image";
      const apiKey = "693d0058df314c5fbd055b0f4cfa29e9";

      const headers = {
        "Prediction-Key": apiKey,
        "Content-Type": "application/octet-stream",
      };

      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
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
      <TouchableOpacity style={styles.addButton} onPress={selectImage}>
        <Text style={styles.addButtonText}>
          {isClassified ? "Upload New Image" : "Select Image"}
        </Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
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
            placeholder="Input Item Price"
            placeholderTextColor="#B7B4B4"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <TextInput
            style={styles.input}
            placeholder="Minimum Order Quantity"
            placeholderTextColor="#B7B4B4"
            value={minOrderQuantity}
            onChangeText={setMinOrderQuantity}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <TouchableOpacity
            style={[styles.addButton, styles.classifyButton]}
            onPress={() =>
              navigation.navigate("UpdatedStore", {
                imageUri: image,
                tag: highestProbabilityTag,
                price,
                minOrderQuantity,
              })
            }
          >
            <Text style={styles.addButtonText2}>Update Store</Text>
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
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#193735",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: 235,
  },
  classifyButton: {
    backgroundColor: "#fff",
    shadowColor: "#193735",
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 5, // Adjust this value to control how far the shadow drops below
    },
    elevation: 6, // For Android
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  addButtonText2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#193735",
    textAlign: "center",
  },
});

export default ScanUploadScreen;
