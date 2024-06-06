import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const UpdatedStore = ({ route }) => {
  const { imageUri, tag, variant, price, minOrderQuantity } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.tagText}>{tag}</Text>
          <Text style={styles.detailText}>VARIANT: {variant}</Text>
          <Text style={styles.detailText}>PRICE: ₦{price}</Text>
          <Text style={styles.detailText}>
            MIN. ORDER QUANTITY: {minOrderQuantity} Packs
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.introText}>
          Add more items to your store{"\n"} or view your store page.
        </Text>
      </View>
      <View style={styles.buttonContainer1}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressedButton : null,
          ]}
          onPress={() => navigation.navigate("Welcome")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>View Store</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  introText: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 240,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "left",
    marginTop: 130,
    marginBottom: 100,
  },
  image: {
    width: 82.5,
    height: 82.5,
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
    padding: 3,
  },
  detailText: {
    fontSize: 16,
    color: "#193735",
    padding: 3,
  },
  buttonContainer1: {
    borderRadius: 18,
    marginBottom: 10,
    width: 235,
    shadowColor: "#193735",
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 6,
  },
  buttonContainer2: {
    borderRadius: 18,
    marginTop: 20,
    width: 235,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button1: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#193735",
  },
  pressedButton: {
    backgroundColor: "#EEEEEE",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    color: "#193735",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonLabel2: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default UpdatedStore;
