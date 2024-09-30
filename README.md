# X OAuth Demo Project

## Overview

This project demonstrates an OAuth 2.0 flow with X (formerly Twitter) using the `twitter-api-sdk`. The project allows users to authenticate via X, retrieve their user information, and display it on an onboarding screen.

## Project Structure

- **Home (`page.tsx`)**: 
  The homepage where users are presented with a "Sign in with X" button. Upon clicking, the user is redirected to X's OAuth authentication page.

- **Onboarding (`onboarding/page.tsx`)**: 
  After the user is authenticated and redirected back to this page, the access token is used to fetch user data from the X API and display it.

- **authClient.ts**: 
  Contains the logic for generating the OAuth client and authorization URL. The `getAuthClient` function ensures a singleton instance of the OAuth client is created, and `generateAuthUrl` generates the OAuth URL with the necessary parameters.

- **constants.ts**: 
  Stores constants such as API endpoints and the OAuth state (`OAUTH_STATE`) for easy reuse throughout the project.

- **API Handlers**: 
  - `/api/auth`: Exchanges the authorization code for an access token.
  - `/api/user`: Fetches user information from X using the access token.

## Environment Variables

The project requires the following environment variables to be set in a `.env.local` file:

NEXT_PUBLIC_BEARER_TOKEN=  
NEXT_PUBLIC_CLIENT_ID=  
NEXT_PUBLIC_CLIENT_SECRET=  
NEXT_PUBLIC_CALLBACK_URL=http://localhost:3000/onboarding  

- **NEXT_PUBLIC_BEARER_TOKEN**: Used for making authenticated requests to the X API.
- **NEXT_PUBLIC_CLIENT_ID**: The client ID for your X OAuth application.
- **NEXT_PUBLIC_CLIENT_SECRET**: The client secret for your X OAuth application.
- **NEXT_PUBLIC_CALLBACK_URL**: The URL where the user will be redirected after authentication (typically your onboarding page).

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shungo0222/x-oauth-demo.git
   cd x-oauth-demo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory of the project and add the necessary environment variables as shown above.

### Running the Project Locally

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### OAuth Flow

- On the homepage (`/`), click on "Sign in with X". 
- You will be redirected to X's OAuth page. Once authenticated, X will redirect you back to the onboarding page (`/onboarding`).
- The onboarding page will fetch and display your X user data.

## API Endpoints

- **/api/auth**: Exchanges the OAuth code for an access token.
- **/api/user**: Fetches user information using the access token.

## Troubleshooting

- **Missing Environment Variables**: Ensure your `.env.local` file is set up correctly with the necessary credentials.
- **Callback URL Mismatch**: Ensure the `NEXT_PUBLIC_CALLBACK_URL` matches the callback URL set in your X Developer Dashboard.
- **Network Issues**: Verify that you are connected to the internet and that the X API is available.

## License

This project is licensed under the MIT License.
