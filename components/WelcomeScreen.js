import React from "react";
import { View, Text, Button, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const userName = "Team Phoenix";

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back, {userName}. </Text>
      <Text style={styles.introText}>
        <Text>So glad you’re back. </Text>
        {"\n"}
        <Text>
          Continue to list some items by manual upload or by using our{"\n"} new
          AI feature to upload your items{"\n"} and start trading! 🤗
        </Text>{" "}
      </Text>

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
            { backgroundColor: pressed ? "#5B84C4" : "#fff", borderRadius: 18 },
          ]}
          title="Upload Item Manually"
          onPress={() => navigation.navigate("ManualUpload")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>Upload Store Item Manually</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.buttonContainer2}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#FB9B50" : "#fff", borderRadius: 18 },
          ]}
          onPress={() => navigation.navigate("ScanUpload")}
        >
          <View style={styles.buttonContent}>
            <FontAwesome name="picture-o" size={12} color="#25292e" />
            <Text style={styles.buttonLabel}>Scan to Upload</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  introText: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
  },
  buttonContainer1: {
    borderWidth: 4,
    borderColor: "#11224D",
    borderRadius: 18,
    marginBottom: -10,
  },
  buttonContainer2: {
    borderWidth: 4,
    borderColor: "#F98125",
    borderRadius: 18,
    marginTop: -10,
  },
  button: {
    padding: 15,
    borderRadius: 18,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    color: "#25292e",
    marginLeft: 10,
  },
  lot: {
    width: "100%", // Specify width to ensure LottieView takes up the entire width
    height: 300,
    aspectRatio: 1,
  },
});

export default WelcomeScreen;
