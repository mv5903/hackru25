<script lang="ts">
	import IntakeForm from '../../components/IntakeForm.svelte';

    export let intakeFormComplete: boolean;
    export let recheckIntakeFormStatus: () => Promise<void>;
</script>

<div class="text-center">
    <h4 class="text-2xl mt-4">Welcome to Plate Pioneer!</h4>
    {#if !intakeFormComplete}
        <IntakeForm recheckIntakeFormStatus={recheckIntakeFormStatus} />
    {:else}
        <p class="mt-4">You can now start adding your recipes! Head over to the explore tab to get started.</p>
        <button class="btn btn-info mt-4" on:click={() => intakeFormComplete = false}>Update Your Intake Form</button>
    {/if}
    <p></p>
</div>