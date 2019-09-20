# Delivery Tracker App

This project was created to allow users to search for products, filter by location and category, and reserve a product for rental and delivery. It was created initially as a mobile application for iOS and Android. It contains:

- User authentication (with JWT)
- Product filtering and search
- Price calculations and
- Product reservation

## Quick Overview

To get is running on local machine or server, make a copy of the `env.example` file by running:

```sh
cp env.example .env
```

Then, add `REACT_APP_GOOGLE_API_KEY` and `REACT_APP_API_URL` to .env file.
You will need to retrieve **REACT_APP_GOOGLE_API_KEY** from [Google Api Console](https://console.cloud.google.com/). And **REACT_APP_API_URL** is the URL for your Api server.
Then run:

```sh
yarn && yarn start
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test` or `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
