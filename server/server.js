// Import express from express.
import express from "express";
// Import ApolloServer from @apollo/server.
import { ApolloServer } from "@apollo/server";
// Import expressMiddleware from @apollo/server/express4.
import { expressMiddleware } from "@apollo/server/express4";
// Import path from path.
import path from "path";
// Import fileURLToPath from url.
import { fileURLToPath } from "url";
// Import authMiddleware from utils/auth.
import { authMiddleware } from "./utils/auth.js";
// Import typeDefs and resolvers from schemas.
import { typeDefs, resolvers } from "./schemas/index.js";
// Import db from config/connection.
import db from "./config/connection.js";
// Import graphqlUploadExpress from graphql-upload-minimal.
import { graphqlUploadExpress } from "graphql-upload-minimal";
// Import cors from cors.
import cors from "cors";
// Set the __filename and __dirname.
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
