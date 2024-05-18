import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import WelcomeScreen from "./components/WelcomeScreen";
import ManualUploadScreen from "./components/ManualUploadScreen";
import ScanUploadScreen from "./components/ScanUploadScreen";
import UpdatedStore from "./components/UpdatedStore";
import CustomHeader from "./components/CustomHeader"; // Import custom header component

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const prepare = async () => {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        // Artificially delay for two seconds to simulate a slow loading experience.
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

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
        <Stack.Screen name="UpdatedStore" component={UpdatedStore} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
