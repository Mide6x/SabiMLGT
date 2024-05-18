import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const userName = "Team Phoenix";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome Back, {userName} 👋 </Text>
        <Text style={styles.introText}>
          So glad you’re back. Continue to list some items by manual upload or
          by using our new AI feature to upload your items and start trading! 🤗
        </Text>
      </View>

      <View style={styles.lot}>
        <LottieView
          style={{ flex: 1 }}
          source={require("../assets/Animation - 1715169001943.json")}
          autoPlay
          loop
        />
      </View>

      <View style={styles.buttonContainer1}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressedButton : null,
          ]}
          onPress={() => navigation.navigate("ManualUpload")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>Update Manually</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.buttonContainer2}>
        <Pressable
          style={({ pressed }) => [
            styles.button1,
            pressed ? styles.pressedButton : null,
          ]}
          onPress={() => navigation.navigate("ScanUpload")}
        >
          <View style={styles.buttonContent}>
            <FontAwesome name="picture-o" size={12} color="#193735" />
            <Text style={styles.buttonLabel2}>Scan to Upload</Text>
          </View>
        </Pressable>
      </View>
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
  header: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    height: 100,
  },
  introText: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
  },
  buttonContainer1: {
    borderRadius: 18,
    marginBottom: 10,
    width: 235,
  },
  buttonContainer2: {
    borderRadius: 18,
    marginTop: 20,
    width: 235,
    shadowColor: "#193735",
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 5, // Adjust this value to control how far the shadow drops below
    },
    elevation: 6, // For Android
  },

  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#193735",
  },
  button1: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
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
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonLabel2: {
    color: "#193735",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  lot: {
    width: "100%", // Specify width to ensure LottieView takes up the entire width
    height: 300,
    aspectRatio: 1,
  },
});

export default WelcomeScreen;
