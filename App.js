import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./components/WelcomeScreen";
import ManualUploadScreen from "./components/ManualUploadScreen";
import ScanUploadScreen from "./components/ScanUploadScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Your Store" component={WelcomeScreen} />
        <Stack.Screen name="ManualUpload" component={ManualUploadScreen} />
        <Stack.Screen name="ScanUpload" component={ScanUploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
