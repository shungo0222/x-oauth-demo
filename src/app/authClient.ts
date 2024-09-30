import { auth } from "twitter-api-sdk";
import { OAUTH_STATE } from "./constants";

// Initialize the authClient as null. It will be instantiated only once.
let authClient: auth.OAuth2User | null = null;

/**
 * Get the OAuth2User client instance.
 * If the client doesn't exist yet, it will be created with the necessary parameters.
 * @returns {auth.OAuth2User} The authenticated client instance.
 */
export const getAuthClient = (): auth.OAuth2User => {
  // Check if the authClient has already been instantiated
  if (!authClient) {
    authClient = new auth.OAuth2User({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      callback: process.env.NEXT_PUBLIC_CALLBACK_URL as string,
      scopes: ["tweet.read", "users.read", "offline.access"], // Define the required scopes
    });
  }
  return authClient;
};

/**
 * Generate the authorization URL.
 * This URL is used to redirect the user to X's OAuth 2.0 authentication flow.
 * @returns {string} The generated authorization URL.
 */
export const generateAuthUrl = (): string => {
  const authClient = getAuthClient(); // Retrieve the singleton auth client
  return authClient.generateAuthURL({
    state: OAUTH_STATE, // Use the constant for the state value
    code_challenge: "test", // In 'plain' method, code_verifier is directly used as the challenge
    code_challenge_method: "plain", // Using the plain method for simplicity
  });
};
