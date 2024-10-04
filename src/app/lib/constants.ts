/**
 * API Endpoints used throughout the application.
 * Functions are provided to dynamically insert required parameters such as `code` and `state`.
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
   * Endpoint for fetching user information.
   * @param {Object} tokenData - The token object containing access token and other information.
   * @returns {string} Full URL for the user information request with encoded token data.
   */
  USER: (tokenData: { access_token: string, token_type: string, scope: string, refresh_token: string, expires_at: number }): string => {
    return `/api/user?tokenData=${encodeURIComponent(JSON.stringify(tokenData))}`;
  }
};

// Define the state value as a constant that can be reused across files
export const OAUTH_STATE = "my-state";
