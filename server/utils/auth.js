// Import dotenv from dotenv.
import dotenv from "dotenv";
// Import jwt from jsonwebtoken.
import jwt from "jsonwebtoken";
// Import GraphQLError from graphql.
import { GraphQLError } from "graphql";
// Configure dotenv.
dotenv.config();
// Set the JWT secret and expiration.
const secret = process.env.JWT_SECRET;
const expiration = "2h";
// Log the JWT secret.
console.log("JWT_SECRET:", secret ? "Secret is set" : "Secret is not set");
// Export the AuthenticationError from graphql.
export const AuthenticationError = new GraphQLError(
  "Could not authenticate user.",
  {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }
);
// Export the authMiddleware function to verify the JWT token.
export const authMiddleware = ({ req }) => {
  // Get the token from the request headers, body, or query.
  let token = req.body.token || req.query.token || req.headers.authorization;
  // Log the received token.
  console.log("Received token:", token);
  // If the token is in the authorization header, remove the Bearer prefix.
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  console.log("Processed token:", token);
  // If no token is found, return the request.
  if (!token) {
    console.log("No token found");
    return req;
  }
  // Verify the token with the JWT secret and expiration.
  try {
    if (!secret) {
      throw new Error("JWT_SECRET is not set");
    }
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
    console.log("Token verified, user:", data);
  } catch (error) {
    console.log("Token verification failed:", error.message);
    console.log("JWT_SECRET:", secret ? "Secret is set" : "Secret is not set");
  }

  return req;
};
// Export the signToken function to sign the JWT token.
export const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
