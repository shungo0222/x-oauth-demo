"use client";

import { useEffect, useState } from "react";
import { generateAuthUrl } from "./lib/xApiClient";

/**
 * Home component for the X OAuth Demo.
 * This component generates the OAuth authentication URL and displays a sign-in button.
 */
export default function Home() {
  const [authUrl, setAuthUrl] = useState<string | null>(null);

  /**
   * Fetch the authentication URL by calling the `generateAuthUrl` function.
   */
  const fetchAuthUrl = async () => {
    try {
      const url = generateAuthUrl();
      setAuthUrl(url);
    } catch (error) {
      console.error("Error generating auth URL:", error);
    }
  };

  // Call fetchAuthUrl when the component mounts
  useEffect(() => {
    fetchAuthUrl();
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">X OAuth Demo</h1>
      {authUrl ? (
        <a href={authUrl}>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
            Sign in with X
          </button>
        </a>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
}
