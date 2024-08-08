import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import App from "./App.jsx";
import "./styles/index.css";
import Home from "./pages/Home.jsx";
import CreatePost from "./pages/Createpost.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Devs from "./pages/Devs.jsx";
import FAQ from "./pages/Faq.jsx";
import Registration from "./pages/Registration.jsx";
import ViewPost from "./pages/Viewpost.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import theme from "./styles/theme.js";
import client from "./utils/helpers.js";

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
        element: <ProtectedRoute />,
        children: [
          {
            path: "/Post",
            element: <CreatePost />,
          },
          {
            path: "/Dashboard",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/Developers",
        element: <Devs />,
      },
      {
        path: "/Faq",
        element: <FAQ />,
      },
      {
        path: "/Registration",
        element: <Registration />,
      },
      {
        path: "/Post/:id",
        element: <ViewPost />,
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