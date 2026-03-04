import type { User } from '$lib/types/user';

class AuthStore {
	user = $state<User | null>(null);
	isLoading = $state(true);

	get isAuthenticated(): boolean {
		return this.user !== null;
	}

	init() {
		this.isLoading = true;
	}

	setUser(user: User | null) {
		this.user = user;
		this.isLoading = false;
	}

	clear() {
		this.user = null;
		this.isLoading = false;
	}
}

export const authStore = new AuthStore();
