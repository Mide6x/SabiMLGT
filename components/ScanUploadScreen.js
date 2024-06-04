import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";

const ScanUploadScreen = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highestProbabilityTag, setHighestProbabilityTag] = useState(null);
  const [isClassified, setIsClassified] = useState(false);
  const [price, setPrice] = useState("");
  const [minOrderQuantity, setMinOrderQuantity] = useState("");
  const [variant, setVariant] = useState("");
  const [variants, setVariants] = useState([]);
  const [permission, requestPermission] = useCameraPermissions();

  const navigation = useNavigation();
  const cameraRef = useRef(null);

  useEffect(() => {
    if (highestProbabilityTag) {
      updateVariants(highestProbabilityTag);
    }
  }, [highestProbabilityTag]);

  const updateVariants = (tag) => {
    const variantOptions = {
      "Milo Chocolate-Flavoured Powder Tin": [
        { label: "400g x1", value: "400g x1" },
        { label: "400g x12", value: "400g x12" },
      ],
      "Mimee Instant Noodles Chicken Flavour": [
        { label: "100g x40", value: "100g x40" },
        { label: "120g x40", value: "120g x40" },
        { label: "70g x40", value: "70g x40" },
      ],
      "Peak Full Cream Milk Tin": [{ label: "400g x6", value: "400g x6" }],
      "Golden Penny Sugar Cube": [{ label: "500g x50", value: "500g x50" }],
    };

    if (variantOptions[tag]) {
      setVariants(variantOptions[tag]);
      if (variantOptions[tag].length === 1) {
        setVariant(variantOptions[tag][0].value); // Auto-select single variant
      }
    } else {
      setVariants([]);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We will need your permission for camera access
        </Text>
        <Button onPress={requestPermission} title="Permission Request" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
      const convertedUri = await convertImageToJpeg(photo.uri);
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

      console.log("Sending request to API..."); //logs for debuggung
      console.log("URL:", apiUrl);
      console.log("Headers:", headers);
      console.log("FormData:", formData);

      const response = await axios.post(apiUrl, formData, { headers });

      const predictions = response.data.predictions;
      console.log("Response:", response.data); //logs for debugging

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

  return (
    <View style={styles.container}>
      <Text style={styles.scanText}>Scan Upload Screen</Text>
      {!isClassified && (
        <>
          <Text style={styles.introText}>
            When taking a picture, please make sure the image is captured in a
            well-lit environment, with the item (e.g., Milo) in range. Try to
            reduce the presence of other items from view.
          </Text>
          <CameraView style={styles.camera} ref={cameraRef}>
            <View style={styles.buttonContainer}></View>
          </CameraView>
          <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
            <Text style={styles.cameraButtonText}>Take Picture</Text>
          </TouchableOpacity>
        </>
      )}

      {isLoading && (
        <>
          <ActivityIndicator size="medium" color="#B7B4B4" />
          <Text style={styles.loadText}>
            Please wait while we classify your image
          </Text>
        </>
      )}

      {isClassified && (
        <>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {highestProbabilityTag && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{highestProbabilityTag}</Text>

              {variants.length > 0 && (
                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={variants}
                  labelField="label"
                  valueField="value"
                  placeholder="Select a Variant"
                  value={variant}
                  onChange={(item) => {
                    setVariant(item.value);
                  }}
                />
              )}
            </View>
          )}
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
                variant,
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
  placeholderStyle: {
    fontSize: 16,
    color: "#193735",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#193735",
    textAlign: "center",
    fontWeight: "600",
  },
  introText: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    marginBottom: 20,
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
    marginVertical: 15,
  },
  scanText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#193735",
    marginBottom: 20,
  },
  camera: {
    width: "100%",
    height: 400,
    borderRadius: 15,
  },
  loadText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    height: 100,
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 15,
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#193735",
    padding: 15,
    width: 235,
    marginTop: 75,
    borderRadius: 5,
  },
  cameraButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 350,
    height: 330,
    marginVertical: 5,
    borderRadius: 10,
  },
  input: {
    width: "80%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
    marginVertical: 10,
    color: "#193735",
    fontSize: 20,
    textAlign: "center",
  },
  dropdown: {
    width: 200,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: "#193735",
    backgroundColor: "#EEEEEE",
  },
  addButton: {
    backgroundColor: "#193735",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
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
