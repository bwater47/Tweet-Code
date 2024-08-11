import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import path from "path";
import { fileURLToPath } from "url";
import { authMiddleware } from "./utils/auth.js";
import { typeDefs, resolvers } from "./schemas/index.js";
import db from "./config/connection.js";
import { graphqlUploadExpress } from "graphql-upload-minimal";
import cors from "cors";
import stripeWebhook from "./utils/stripeWebhook.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set the PORT to 3001 or the environment variable.
const PORT = process.env.PORT || 3001;
// Create a new instance of express.
const app = express();
// Create a new instance of an Apollo server with the GraphQL schema.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
});

// Create an async function to start the Apollo server.
const startApolloServer = async () => {
  await server.start();

  // CORS configuration.
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use("/stripe", stripeWebhook);

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets.
  app.use("/images", express.static(path.join(__dirname, "../client/images")));

  // File upload middleware.
  app.use(graphqlUploadExpress());
  // Apply the Apollo server to the Express server.
  app.use(
    "/graphql",
    // Add the expressMiddleware to the /graphql endpoint.
    expressMiddleware(server, {
      context: async ({ req }) => {
        console.log("Request headers:", req.headers);
        return authMiddleware({ req });
      },
    })
  );
  // Serve up static assets in production.
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    // Serve up the index.html file if the route is not recognized.
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }
  // Start the server on the specified port and log the port number to the console when the server starts listening for requests.
  try {
    await db();
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

// Call the async function to start the server.
startApolloServer();
