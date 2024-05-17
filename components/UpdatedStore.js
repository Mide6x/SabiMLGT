import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const UpdatedStore = ({ route }) => {
  const { imageUri, tag, price, minOrderQuantity } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.tagText}>{tag}</Text>
          <Text style={styles.detailText}>Price: ₦{price}</Text>
          <Text style={styles.detailText}>
            Min. Order Quantity: {minOrderQuantity}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Text style={styles.backButtonText}>Back to Welcome Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    justifyContent: "center",
  },
  tagText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#193735",
  },
  detailText: {
    fontSize: 16,
    color: "#193735",
  },
  backButton: {
    backgroundColor: "#193735",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default UpdatedStore;