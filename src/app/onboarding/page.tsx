"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { API_ENDPOINTS, OAUTH_STATE } from "../lib/constants";
import { getAuthClient } from "../lib/xApiClient";

/**
 * Onboarding component handles OAuth authentication and fetches user data from the API.
 */
export default function Onboarding() {
  const searchParams = useSearchParams();
  const [tokenData, setTokenData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    /**
     * Fetch the OAuth access token using the authorization code and state from URL,
     * then fetch the token and user data using getAuthClient.
     */
    const fetchAuthData = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (!code || state !== OAUTH_STATE) {
        console.error("Missing necessary parameters or invalid state.");
        return;
      }

      try {
        // Obtaining an access token from an authorization code
        const response = await fetch(API_ENDPOINTS.AUTH(code, state));
        const data = await response.json();

        if (data.access_token) {
          console.log("Access token received");

          // Save the token information directly from the response data
          setTokenData(data);

          // Get the authClient instance
          const authClient = await getAuthClient();

          // Manually set the token in the authClient
          authClient.token = data;

          // Now fetch the user data from the backend API
          await fetchUserData(data);
        }
      } catch (error) {
        console.error("Error fetching access token or user data:", error);
      }
    };

    /**
     * Fetch user data from the backend API.
     */
    const fetchUserData = async (tokenData: any) => {
      try {
        // Call the backend API to get the user data
        const response = await fetch(API_ENDPOINTS.USER(tokenData));
        const userData = await response.json();

        if (userData.user) {
          setUserData(userData.user); // Save user data
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Get token if authorization code is present in URL
    if (searchParams.get("code")) {
      fetchAuthData();
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Onboarding</h1>
      
      {/* Display token information in table format */}
      {tokenData ? (
        <table className="table-auto mt-6 border-collapse border border-gray-400 text-gray-600">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Token Key</th>
              <th className="border border-gray-300 px-4 py-2">Token Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tokenData).map(([key, value]) => (
              <tr key={key}>
                <td className="border border-gray-300 px-4 py-2">{key}</td>
                <td className="border border-gray-300 px-4 py-2">{String(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">Loading token data...</p>
      )}

      {/* Display user data in table format */}
      {userData ? (
        <table className="table-auto mt-6 border-collapse border border-gray-400 text-gray-600">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">User Info Key</th>
              <th className="border border-gray-300 px-4 py-2">User Info Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(userData).map(([key, value]) => (
              <tr key={key}>
                <td className="border border-gray-300 px-4 py-2">{key}</td>
                <td className="border border-gray-300 px-4 py-2">{String(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 mt-8">Loading user data...</p>
      )}
    </div>
  );
}
