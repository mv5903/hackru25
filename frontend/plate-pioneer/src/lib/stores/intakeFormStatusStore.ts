import { writable } from 'svelte/store';

export const intakeFormCompleted = writable<boolean>(false);
export const recheckIntakeForm = writable<Function>(() => {});