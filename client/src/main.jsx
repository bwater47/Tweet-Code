// Import React from the react package to use JSX.
import React from "react";
// Import ChakraProvider from Chakra UI to provide the theme to the app.
import { ChakraProvider } from "@chakra-ui/react";
// Import ReactDOM from react-dom/client to render the app.
import ReactDOM from "react-dom/client";
// Import createBrowserRouter, RouterProvider from react-router-dom to create the router.
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Import ApolloProvider from @apollo/client to provide the Apollo client to the app.
import { ApolloProvider } from "@apollo/client";
// Import App component from App.jsx.
import App from "./App.jsx";
// Import CSS file.
import "./styles/index.css";
// Import Pages.
import CreatePost from "./pages/Createpost.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Devs from "./pages/Devs.jsx";
import FAQ from "./pages/Faq.jsx";
import Home from "./pages/Home.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import Registration from "./pages/Registration.jsx";
import Success from "./pages/Success.jsx";
import ViewPost from "./pages/Viewpost.jsx";
// Import ProtectedRoute component to protect routes from unauthenticated users.
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
// Import custom Theme.
import theme from "./styles/theme.js";
// Import client from helpers.js.
import client from "./utils/helpers.js";
import Donate from "../src/pages/Donate.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";

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
