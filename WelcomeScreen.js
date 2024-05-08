import React from "react";
import { View, Text, Button, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const userName = "Team Pheonix";

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back, {userName}. </Text>
      <View style={styles.buttonContainer1}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#11224D" : "#fff" },
          ]}
          title="Upload Item Manually"
          onPress={() => navigation.navigate("ManualUpload")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>Scan to Upload</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.buttonContainer2}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#F98125" : "#fff" },
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20, // Add padding to push content down
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20, // Add margin to separate from buttons
  },
  buttonContainer1: {
    borderWidth: 4,
    borderColor: "#11224D",
    borderRadius: 18,
  },
  buttonContainer2: {
    borderWidth: 4,
    borderColor: "#F98125",
    borderRadius: 18,
  },
  button: {
    padding: 10,
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
});

export default WelcomeScreen;
