/**
 * API Endpoints used throughout the application.
 * Functions are provided to dynamically insert required parameters such as `code`, `state`, and `accessToken`.
 */
export const API_ENDPOINTS = {
  /**
   * Endpoint for fetching the OAuth access token using authorization code and state.
   * @param {string} code - Authorization code received from OAuth flow.
   * @param {string} state - State parameter to ensure the validity of the request.
   * @returns {string} Full URL for the access token request.
   */
  AUTH: (code: string, state: string): string => `/api/auth?code=${code}&state=${state}`,

  /**
   * Endpoint for fetching user information using the access token.
   * @param {string} token - The access token for authenticated API requests.
   * @returns {string} Full URL for the user information request.
   */
  USER: (token: string): string => `/api/user?accessToken=${token}`,
};

// Define the state value as a constant that can be reused across files
export const OAUTH_STATE = "my-state";
