<script lang="ts">
	import { getAuth0 } from "$lib/auth";
	import type { User } from "@auth0/auth0-spa-js";
	import { onMount } from "svelte";

    async function logout() {
		const client = await getAuth0();
		client.logout();
	}

    let user: User | undefined = undefined;

    onMount(async () => {
        const client = await getAuth0();
        user =  await client.getUser();
    });
</script>

<div class="container">
    <div class="mt-4">
        {#if user && user.given_name}
            <p class="text-lg">Hello {user.given_name}!</p>
        {:else}
            <p class="text-lg">Hi!</p>
        {/if}
        <button class="btn btn-error w-1/2" on:click={() => logout()}>Log out</button>
    </div>
</div>