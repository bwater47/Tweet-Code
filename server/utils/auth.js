import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

dotenv.config();

const secret = process.env.JWT_SECRET;
const expiration = "2h";


console.log("JWT_SECRET:", secret ? "Secret is set" : "Secret is not set");

export const AuthenticationError = new GraphQLError(
  "Could not authenticate user.",
  {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }
);

export const authMiddleware = ({ req }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  console.log("Received token:", token);

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  console.log("Processed token:", token);

  if (!token) {
    console.log("No token found");
    return req;
  }

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

export const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
