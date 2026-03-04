<script lang="ts">
	import { authStore } from '$lib/auth/auth.svelte';
	import { ensureAuthenticated } from '$lib/auth/session';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(async () => {
		await ensureAuthenticated();
	});
</script>

{#if authStore.isLoading}
	<!-- Loading state - prevents flash of unauthenticated content -->
	<div class="loading">Loading...</div>
{:else if authStore.isAuthenticated}
	<!-- Authenticated content -->
	{@render children()}
{:else}
	<!-- Not authenticated - shouldn't show since redirect happens -->
	<div class="loading">Redirecting to login...</div>
{/if}
