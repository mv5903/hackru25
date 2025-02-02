<script lang="ts">
	import { clientAPIInstance } from '$lib/stores/clientAPIStore';
	import { onMount } from "svelte";
	import IntakeForm from '../../components/IntakeForm.svelte';

    let intakeFormComplete = false;

    onMount(async () => {
        if ($clientAPIInstance) {
            intakeFormComplete = await $clientAPIInstance.intakeFormComplete();
        }
    });
</script>

<div class="text-center">
    <h4 class="text-2xl mt-4">Welcome to Plate Pioneer!</h4>
    {#if !intakeFormComplete}
        <IntakeForm />
    {:else}
        <p class="mt-4">You can now start adding your recipes!</p>
    {/if}
    <p></p>
</div>