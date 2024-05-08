import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./components/WelcomeScreen";
import ManualUploadScreen from "./components/ManualUploadScreen";
import ScanUploadScreen from "./components/ScanUploadScreen";
import CustomHeader from "./components/CustomHeader"; // Import custom header component

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <CustomHeader {...props} />, // Use custom header component
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ManualUpload" component={ManualUploadScreen} />
        <Stack.Screen name="ScanUpload" component={ScanUploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
