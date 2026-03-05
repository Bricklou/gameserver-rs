<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { api } from '$lib/api';
	import { authStore } from '$lib/auth/auth.svelte';

	$effect(() => {
		if (authStore.isAuthenticated) {
			goto(resolve('/(protected)/dashboard'));
		}
	});

	let loading = $state(false);
	let error = $state('');
	let user = $state('');
	let password = $state('');
	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;
		error = '';

		try {
			const response = await api.login(user, password);

			goto('');
		} catch (err) {
			error = `Login failed: ${err instanceof Error ? err.message : JSON.stringify(err)}`;
		}
	}
</script>

<div class=" flex min-h-screen flex-col">
	<header class="flex flex-row justify-center bg-orange-600 px-4 py-3 text-white">
		<h1 class="text-2xl font-semibold">Welcome to GameServer</h1>
	</header>

	<div class="flex flex-1 flex-col items-center justify-center">
		<form
			class="flex min-w-full flex-col gap-8 rounded-lg bg-white p-4 shadow-sm md:min-w-96"
			onsubmit={handleSubmit}
		>
			<h2 class="font-semibold tracking-wide">Login</h2>

			{#if error}
				<div class="rounded bg-red-100 px-4 py-2 text-red-800 truncate text-wrap">{error}</div>
			{/if}

			<div class="flex flex-col gap-4">
				<label class="flex flex-col gap-1">
					<span class="text-sm font-medium">Username</span>
					<input
						type="text"
						class="rounded border border-gray-300 px-3 py-2"
						placeholder="Enter username"
						required
					/>
				</label>

				<label class="flex flex-col gap-1">
					<span class="text-sm font-medium">Password</span>
					<input
						type="password"
						class="rounded border border-gray-300 px-3 py-2"
						placeholder="Enter password"
						required
					/>
				</label>
			</div>

			<button class="rounded bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700">
				Login
			</button>
		</form>
	</div>
</div>
