import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./styles/index.css";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";

import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    palette: {

        white: '#FFFFFF',
        orange: '#FEA43C',
        red: '#F9213B',
        cyan: '#00FFFF',
        purple: '#7A52FF',
        yellow: '#ECFF77',
        green: '#36802A',
        grey: '#8B8C89',
        darkgrey: '#1f1f1f',


      
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
