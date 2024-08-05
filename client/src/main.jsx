import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./App.jsx";
import "./styles/index.css";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Dashboard.jsx";
import FAQ from "./pages/Faq.jsx";
import Registration from "./pages/Registration.jsx";
import theme from './styles/theme.js'

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});



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
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);
