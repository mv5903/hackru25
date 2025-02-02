import { PlatePioneerAPI } from '$lib/client/PlatePioneerAPI';
import { writable } from 'svelte/store';

export const clientAPIInstance = writable<PlatePioneerAPI | null>(null);