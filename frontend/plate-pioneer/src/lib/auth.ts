// src/lib/auth.js
import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';

let auth0Client: Auth0Client | null = null;

export async function getAuth0() {
  if (!auth0Client) {
    auth0Client = await createAuth0Client({
      domain: "dev-wwl580pzupbxnr5y.us.auth0.com",
      clientId: "mDznmTnsp2eZ1BglZADay52wNVCITXA9",
      authorizationParams: {
        redirect_uri: "https://plate-pioneer.us/",
      }
    });
  }
  return auth0Client;
}
