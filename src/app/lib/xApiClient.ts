import { auth, Client } from "twitter-api-sdk";
import { OAUTH_STATE } from "./constants";

// Initialize clients as null. They will be instantiated only once.
let authClient: auth.OAuth2User | null = null;
let bearerClient: auth.OAuth2Bearer | null = null;
let apiClient: Client | null = null;

/**
 * Get the OAuth2User client instance.
 * If the client doesn't exist yet, it will be created with the necessary parameters.
 * This is used for user-specific authentication.
 * @returns {auth.OAuth2User} The OAuth2User client instance.
 */
export const getAuthClient = (): auth.OAuth2User => {
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
 * Get the OAuth2Bearer client instance.
 * If the client doesn't exist yet, it will be created with the necessary parameters.
 * This is used for application-level authentication (Bearer token).
 * @returns {auth.OAuth2Bearer} The OAuth2Bearer client instance.
 */
export const getBearerClient = (): auth.OAuth2Bearer => {
  if (!bearerClient) {
    bearerClient = new auth.OAuth2Bearer(process.env.NEXT_PUBLIC_BEARER_TOKEN as string);
  }
  return bearerClient;
};

/**
 * Generate the authorization URL.
 * This URL is used to redirect the user to X's OAuth 2.0 authentication flow.
 * @returns {string} The generated authorization URL.
 */
export const generateAuthUrl = (): string => {
  const authClient = getAuthClient(); // Retrieve the singleton OAuth2User client
  return authClient.generateAuthURL({
    state: OAUTH_STATE, // Use the constant for the state value
    code_challenge: "test", // In 'plain' method, code_verifier is directly used as the challenge
    code_challenge_method: "plain", // Using the plain method for simplicity
  });
};

/**
 * Get the X API Client instance.
 * Uses the authenticated OAuth2User or OAuth2Bearer client depending on the use case.
 * @param {boolean} useBearer - If true, uses the OAuth2Bearer client. Defaults to false (OAuth2User).
 * @returns {Client} The Twitter API client instance.
 */
export const getApiClient = (useBearer: boolean = false): Client => {
  if (!apiClient) {
    const client = useBearer ? getBearerClient() : getAuthClient(); // Choose OAuth2Bearer or OAuth2User client
    apiClient = new Client(client);
  }
  return apiClient;
};