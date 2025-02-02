<script lang="ts">
    export let responses: string;
    export let question: string;

    function saveResponses() {
        return responses;
    }
</script>

<div class="my-4">
    <p class="mb-3"><strong>{question}</strong></p>
    <!-- svelte-ignore element_invalid_self_closing_tag -->
    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs input-md" bind:value={responses} />
</div>