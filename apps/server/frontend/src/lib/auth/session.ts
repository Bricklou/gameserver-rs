import { goto } from '$app/navigation';
import { api } from '$lib/api';
import { authStore } from './auth.svelte';
import { resolve } from '$app/paths';

let lastSuccessfulCheck = 0;
const AUTH_CHECK_EXPIRES_MS = 20000; // 20 seconds

export async function ensureAuthenticated(): Promise<boolean> {
	const now = Date.now();

	// Skip check if user is authenticated and we verified recently
	if (authStore.isAuthenticated && now - lastSuccessfulCheck < AUTH_CHECK_EXPIRES_MS) {
		return true;
	}

	// Show loading spinner only on initial auth check
	if (!authStore.isAuthenticated) {
		authStore.init();
	}

	try {
		const user = await api.getCurrentUser();
		authStore.setUser(user);
		lastSuccessfulCheck = now;
		return true;
	} catch {
		authStore.clear();
		window.location.href = '/login';
		return false;
	}
}

export async function logout(): Promise<void> {
	try {
		await api.logout();
	} catch (error) {
		console.error('Logout failed:', error);
	} finally {
		authStore.clear();
		lastSuccessfulCheck = 0;
		goto(resolve('/login'));
	}
}
