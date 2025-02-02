<script lang="ts">
	import { onMount } from 'svelte';
	import type NavItemType from '../assets/NavItemType';
	import { navItems } from '../assets/NavItemType';
	import NavItem from '../components/NavItem.svelte';

	import { getAuth0 } from '$lib/auth';
	import { PlatePioneerAPI } from '$lib/client/PlatePioneerAPI';
	import { auth0, isAuthenticated, user } from '$lib/stores/authStore';
	import { clientAPIInstance } from '$lib/stores/clientAPIStore';
	import Achievements from './pages/Achievements.svelte';
	import Add from './pages/Add.svelte';
	import Explore from './pages/Explore.svelte';
	import Home from './pages/Home.svelte';
	import Profile from './pages/Profile.svelte';

	// Map each nav id to its component
	const pages: Record<string, typeof Home> = {
		home: Home,
		explore: Explore,
		add: Add,
		achievements: Achievements,
		profile: Profile
	};

	let currentNavItem: NavItemType = navItems[0];

	function updateNavItem(item: NavItemType) {
		currentNavItem = item;
	}

	onMount(async () => {
		const client = await getAuth0();
		auth0.set(client);

		// If returning from a redirect login, handle the callback:
		if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
			await client.handleRedirectCallback();
			// Clean up the URL by removing query parameters
			window.history.replaceState({}, document.title, window.location.pathname);
		}

		const auth = await client.isAuthenticated();
		isAuthenticated.set(auth);
		if (auth) {
			const userData = await client.getUser();
			user.set(userData);
		}

		if ($user?.sub) {
			clientAPIInstance.set(new PlatePioneerAPI($user?.sub));
			await $clientAPIInstance?.signup();
		} else {
			
		}
	});

	async function login() {
		const client = await getAuth0();
		await client.loginWithRedirect();
	}

	async function logout() {
		const client = await getAuth0();
		client.logout();
	}
</script>

<div class={`flex md:w-3/4 w-full justify-center place-items-center mx-auto ${!$isAuthenticated && 'h-[100vh]'}`}>
	{#if !$isAuthenticated}
		<div
			class="container flex h-full w-full flex-col place-items-center justify-center gap-12 text-center"
		>
			<h1 class="text-3xl">Plate Pioneer</h1>
			<p>
				Log what you cook at home, and use AI to come up with new dishes to cook based on your
				eating preferences!
			</p>
			<button class="btn btn-primary w-1/2" on:click={() => login()}>Get Started</button>
		</div>
	{:else}
		<div class="m-3 mb-20 w-full text-center">
			<h1 class="text-3xl">Plate Pioneer</h1>
			<h2 class="text-4xl font-bold">{currentNavItem.label}</h2>
			<svelte:component this={pages[currentNavItem.id]} />
		</div>
		<div class="btm-nav fixed bottom-0 w-full">
			{#each navItems as navItem}
				<NavItem tab={navItem} isActive={navItem === currentNavItem} {updateNavItem} />
			{/each}
		</div>
	{/if}
</div>
