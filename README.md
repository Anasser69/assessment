# Assessment App

This is a React Native application that uses Redux for state management and supports multiple languages using `i18n-js`.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Documentation](#documentation)
- [Contributing](#contributing)


## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/).
- You have installed [Expo CLI](https://docs.expo.dev/get-started/installation/).
- You have a basic understanding of React Native and Redux.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/assessment-app.git
    cd assessment-app
    ```

2. Install the dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory and add your API URL:

    ```env
    API_URL=https:https://jsonplaceholder.typicode.com
    ```

## Running the Project

1. Start the Expo development server:

    ```sh
    npm start
    # or
    yarn start
    ```

2. Follow the instructions in the terminal to run the app on an emulator or a physical device.


## Documentation

### Redux Store

The Redux store is configured in `assessment/utils/store.js`. It includes two slices:

- `postsSlice`: Manages the state of posts fetched from the API.
- `languageSlice`: Manages the current language setting.

### i18n Configuration

The i18n configuration is located in `assessment/utils/i18n.js`. Translation strings are defined in `assessment/utils/translations.js`.

### Environment Variables

Environment variables are managed using `react-native-dotenv`. Ensure you have a `.env` file in the root directory with the following content:

### Running on Android/iOS

To run the project on an Android or iOS device, use the following commands:
sh
npm run android
or
yarn android
npm run ios
or
yarn ios

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
