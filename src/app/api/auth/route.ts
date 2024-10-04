import { NextRequest, NextResponse } from "next/server";
import { getAuthClient, generateAuthUrl } from "../../lib/xApiClient";
import { OAUTH_STATE } from "../../lib/constants";

/**
 * Handle GET request for OAuth access token.
 * This endpoint is triggered when the user is redirected back with an authorization code.
 * It validates the code and state, then exchanges the code for an access token.
 * 
 * @param {NextRequest} request - The incoming request with query parameters.
 * @returns {NextResponse} - The JSON response containing the access token or an error message.
 */
export async function GET(request: NextRequest) {
  console.log("API called for access token");

  // Extract the authorization code and state from the URL parameters
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  // Validate the presence of the code and state, and ensure the state matches the expected value
  if (!code || state !== OAUTH_STATE) {
    console.error("Missing or invalid parameters. Code or state is incorrect.");
    return NextResponse.json({ error: "Missing or invalid parameters" }, { status: 400 });
  }

  try {
    console.log("Code received:", code);

    const authClient = getAuthClient(); // Retrieve the OAuth client instance

    /**
     * Although this line doesn't perform any action in this context, removing it causes an error.
     * The error is related to missing the required 'code_verifier' parameter during the OAuth 2.0 process.
     * For more details, refer to: 
     * https://community.make.com/t/error-missing-required-parameter-code-verifier-from-http-module-with-oauth-2-0-request/17420/4
     */
    generateAuthUrl(); // Necessary call to prevent 'code_verifier' error

    console.log("Requesting access token...");

    // Exchange the authorization code for an access token
    const tokenResponse = await authClient.requestAccessToken(code);

    // Log and return the access token in the response
    console.log("Access token received:", tokenResponse.token.access_token);
    return NextResponse.json({ access_token: tokenResponse.token.access_token });
  } catch (error: any) {
    // Log the error and return a 500 status code with error details
    console.error("Error fetching access token:", error);
    return NextResponse.json({ error: "Failed to fetch access token", details: error.message }, { status: 500 });
  }
}
