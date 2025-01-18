import jwt from "jsonwebtoken";

// Define a secret key for signing the token (store securely in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const createJWTToken = (user) => {
  // Create the payload for the JWT
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    authType: user.authType,
  };

  // Sign the JWT with the secret key
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // The token will be valid for 1 hour
};

export default createJWTToken;
