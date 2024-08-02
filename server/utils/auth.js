// Imports for ESM.
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

export const AuthenticationError = new GraphQLError(
  "Could not authenticate user.",
  {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }
);

export function authMiddleware({ req }) {
  // Allows token to be sent via req.body, req.query, or headers.
  let token = req.body.token || req.query.token || req.headers.authorization;
  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }
  if (!token) {
    return req;
  }
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid token");
  }
  return req;
}

export function signToken({ firstName, email, _id }) {
  const payload = { firstName, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
