"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { API_ENDPOINTS, OAUTH_STATE } from "../constants";

/**
 * Onboarding component handles OAuth authentication and fetches user data from the API.
 */
export default function Onboarding() {
  const searchParams = useSearchParams();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    /**
     * Fetch the OAuth access token using the authorization code and state from URL.
     */
    const fetchToken = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (!code || state !== OAUTH_STATE) {
        console.error("Missing necessary parameters or invalid state");
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.AUTH(code, state));
        const data = await response.json();

        if (data.access_token) {
          console.log("Access token received:", data.access_token);
          setAccessToken(data.access_token);

          // Fetch the user data after receiving the access token
          await fetchUserData(data.access_token);
        } else {
          console.error("Access token is undefined");
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    /**
     * Fetch user data from the API using the access token.
     * @param {string} token - OAuth access token.
     */
    const fetchUserData = async (token: string) => {
      try {
        const response = await fetch(API_ENDPOINTS.USER(token));
        const data = await response.json();

        if (data.user) {
          setUserData(data.user);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Trigger token fetching when the code is present in URL params and accessToken is not set
    if (!accessToken && searchParams.get("code")) {
      console.log("Fetching token...");
      fetchToken();
    }
  }, [accessToken, searchParams]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Onboarding</h1>
      {accessToken ? (
        <>
          <p className="text-gray-700 mb-4">
            Access Token: <span className="font-mono">{accessToken}</span>
          </p>
          {userData ? (
            <div className="text-center text-gray-600">
              <h2 className="text-xl font-semibold mb-2">Username: {userData.username}</h2>
              <p>ID: {userData.id}</p>
              <p>Name: {userData.name}</p>
            </div>
          ) : (
            <p className="text-gray-600">Loading user data...</p>
          )}
        </>
      ) : (
        <p className="text-gray-600">Authenticating...</p>
      )}
    </div>
  );
}
