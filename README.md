# SabiMLGT

Hey there, awesome reader! 👋

Welcome to the magical world of **SabiMLGT**! 🎉

You might be wondering, "Why am I here?" Well, it’s probably because:

- I told you about this amazing project and you just had to check it out.
- You stumbled upon it in a serendipitous internet adventure.
- You work at Sabl and are here on official (or unofficial) business, lol.

So, what's this project all about? Buckle up! 🚀

## The Lowdown

**SabiMLGT** is where cutting-edge image classification meets sleek, beautiful UI in a React Native app. We took an already built image classification model (yes, the name's redacted for dramatic effect, lmao) and integrated it into a user-friendly app that not only works like a charm but also looks stunning. 🌟

But wait, there’s more! This project aims to make life easier for:

- You (yes, YOU!).
- Me (because why not?).
- Sellers everywhere (woahhh).

## What's Next?

As time goes on (or by the end of June if we’re feeling ambitious), I’ll be adding a more detailed and robust README file. Stay tuned for all the juicy details! 📚

For now, that’s all folks! Catch you later. 👋✨

# Part 1

## Intro, Installation and Setup

# SabiMLGT

This repository contains the source code for SabiMLGT, a mobile application built with Expo React Native. The application allows users to upload images and classify them using machine learning.

## Installation and Setup

### Prerequisites

Before installing and setting up the application, ensure you have the following hardware and software requirements:

#### Hardware Requirements

- A computer with at least 4GB of RAM (8GB recommended)
- Stable internet connection
- A mobile device (iOS or Android) or an emulator to test the application

#### Software Requirements

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (version 6.x or higher) or [yarn](https://yarnpkg.com/) (version 1.x or higher)
- [Expo CLI](https://expo.dev/tools#cli) (version 4.x or higher)
- [Git](https://git-scm.com/)
- An IDE or text editor (e.g., [Visual Studio Code](https://code.visualstudio.com/))

### Installation Steps

Follow these detailed step-by-step instructions to install and configure the system:

1. **Clone the Repository:**

   Open your terminal or command prompt and run the following command:

   ```sh
   git clone https://github.com/Mide6x/SabiMLGT.git
   ```

2. **Navigate to the Project Directory:**

   ```sh
   cd SabiMLGT
   ```

3. **Install Dependencies:**

   If you are using npm:

   ```sh
   npm install
   ```

   Or if you are using yarn:

   ```sh
   yarn install
   ```

4. **Install Expo CLI:**

   If you haven't already installed Expo CLI globally, run the following command:

   ```sh
   npm install -g expo-cli
   ```

5. **Start the Expo Development Server:**

   ```sh
   expo start
   ```

   This command will start the Expo development server and open the Expo Developer Tools in your browser.

6. **Run the Application:**

   - **On a Physical Device:**

     - Download the Expo Go app from the [Apple App Store](https://apps.apple.com/us/app/expo-go/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent).
     - Scan the QR code displayed in the Expo Developer Tools with the Expo Go app.

   - **On an Emulator/Simulator:**

     - For iOS:

       ```sh
       expo run:ios
       ```

     - For Android:

       ```sh
       expo run:android
       ```

### Configuration

Guidance on how to configure the system for different environments or use cases:

1. **Environment Variables:**

   Create a `.env` file in the root directory of your project to store environment-specific variables. Example:

   ```sh
   API_KEY=your_api_key
   BASE_URL=https://yourapi.com
   ```

2. **Expo Configuration:**

   Customize the `app.json` file to suit your project needs.

3. **Configuring Different Environments:**

   - **Development:**

     Use `.env.development` for development-specific configurations.

   - **Staging:**

     Use `.env.staging` for staging-specific configurations.

   - **Production:**

     Use `.env.production` for production-specific configurations.

   To switch between environments, you can use packages like `react-native-dotenv` to load the appropriate environment variables.

4. **API Integration:**

   Ensure that your API endpoints and keys are correctly configured in your environment variables and imported into your React Native components.

5. **Testing on Different Devices:**

   Test the application on various devices and screen sizes to ensure compatibility and responsiveness.

By following these steps, you should be able to successfully install, set up, and configure your Expo React Native application for different environments and use cases.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
