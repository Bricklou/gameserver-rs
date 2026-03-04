<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/auth/auth.svelte';
	import { resolve } from '$app/paths';

	// Redirect to dashboard if already logged in
	$effect(() => {
		if (authStore.isAuthenticated) {
			goto(resolve('/(protected)/dashboard'));
		} else {
			goto(resolve('/login'));
		}
	});
</script>
