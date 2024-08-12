import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import App from "./App.jsx";
import "./styles/index.css";
import CreatePost from "./pages/Createpost.jsx";
import CustomerService from "./pages/CustomerService.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Devs from "./pages/Devs.jsx";
import FAQ from "./pages/Faq.jsx";
import Home from "./pages/Home.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import Registration from "./pages/Registration.jsx";
import Success from "./pages/Success.jsx";
import ViewPost from "./pages/Viewpost.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import theme from "./styles/theme.js";
import client from "./utils/helpers.js";
import Donate from "../src/pages/Donate.jsx";


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
        path: "/Support",
        element: <CustomerService />
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
        path: "/problem/:id",
        element: <ProblemPage />,
      },
      {
        path: "/Registration",
        element: <Registration />,
      },
      {
        path: "/Success",
        element: <Success />,
      },
      {
        path: "/Post/:id",
        element: <ViewPost />,
      },
      {
        path: "/Donate",
        element: <Donate />,
      },
      {
        path: "/problem/:id",
        element: <ProblemPage />,
      },
    ],
  },
]);
// Render the app using ReactDOM.createRoot.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);
