import React from "react";
import { StatusBar, View, StyleSheet } from "react-native";

const CustomHeader = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", // Set background color of header if needed
  },
});

export default CustomHeader;
