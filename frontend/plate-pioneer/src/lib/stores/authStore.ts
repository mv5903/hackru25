// src/stores/authStore.js
import { Auth0Client, User } from '@auth0/auth0-spa-js';
import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);
export const user = writable<User | undefined>(undefined);
export const auth0 = writable<Auth0Client | null >(null);
