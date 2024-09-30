import { NextRequest, NextResponse } from "next/server";
import { Client } from "twitter-api-sdk";

/**
 * Handle GET request to fetch user information from the X API.
 * It requires an access token to authenticate the request.
 * 
 * @param {NextRequest} request - The incoming request with query parameters.
 * @returns {NextResponse} - The JSON response containing the user data or an error message.
 */
export async function GET(request: NextRequest) {
  // Extract the access token from the URL parameters
  const token = request.nextUrl.searchParams.get("accessToken");

  // Check if the access token is provided
  if (!token) {
    console.error("Missing access token in the request.");
    return NextResponse.json({ error: "Missing access token" }, { status: 400 });
  }

  try {
    // Initialize the Twitter API client with the access token
    const client = new Client(token);

    // Fetch user data using the Twitter API
    const userResponse = await client.users.findMyUser();

    // Return the user data in the response
    return NextResponse.json({ user: userResponse.data });
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error("Error fetching user data from Twitter API:", error);

    // Return a 500 response with the error message
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}
