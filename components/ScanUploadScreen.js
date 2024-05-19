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
import * as ImageManipulator from "expo-image-manipulator";
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
      Alert.alert("Permission required 👉👈", "Please enable photos access");
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
      // Convert HEIF/HEIC to JPEG if necessary
      const convertedUri = await convertImageToJpeg(uri);
      setImage(convertedUri);
      setIsClassified(false); // Reset classified state
      classifyImage(convertedUri); // Automatically classify the image
    }
  };

  const convertImageToJpeg = async (uri) => {
    const { type } = await ImageManipulator.manipulateAsync(uri, [], {
      base64: false,
    });
    const extension = uri.split(".").pop().toLowerCase();

    if (
      type === "image/heif" ||
      type === "image/heic" ||
      extension === "heif" ||
      extension === "heic"
    ) {
      const manipulatedResult = await ImageManipulator.manipulateAsync(
        uri,
        [],
        { format: ImageManipulator.SaveFormat.JPG }
      );
      return manipulatedResult.uri;
    }
    return uri;
  };

  const classifyImage = async (imageUri) => {
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
        uri: imageUri,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      const response = await axios.post(apiUrl, formData, { headers });

      const predictions = response.data.predictions;

      // Filter predictions to only include those with probability > 0.89
      const validPredictions = predictions.filter(
        (prediction) => prediction.probability > 0.89
      );

      if (validPredictions.length > 0) {
        // Find the prediction with the highest probability
        const highestPrediction = validPredictions.reduce((prev, current) =>
          prev.probability > current.probability ? prev : current
        );
        setHighestProbabilityTag(highestPrediction.tagName);
        setIsClassified(true); // Set classified state to true
      } else {
        Alert.alert(
          "Low Confidence 🫢",
          "The system could not confidently classify the image. Please upload a better picture or input the item manually."
        );
        setHighestProbabilityTag(null);
        setIsClassified(false); // Reset classified state
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Unknown Error 🥲",
        "An error occurred during classification. Please try again or input the item manually."
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
      {!isClassified && (
        <Text style={styles.introText}>
          When selecting an image, Please make sure the image is captured in a
          well lit environment, with the item (i.e Milo) in range. Try as much
          as possible to reduce the presence of other items from view.
        </Text>
      )}
      <TouchableOpacity style={styles.addButton} onPress={selectImage}>
        <Text style={styles.addButtonText}>
          {isClassified ? "Upload New Image" : "Select an Image"}
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
  introText: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
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
      height: 5,
    },
    elevation: 6,
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
