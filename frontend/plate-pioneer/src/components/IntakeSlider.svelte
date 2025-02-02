<script lang="ts">
    export let response: string;
    export let question: string;
    export let choices: string[];
</script>

<div class="mt-4">
    <p class="pb-3"><strong>{question}</strong></p>
    {#each choices as choice}
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text">{choice}</span>
                <input type="radio" name="radio-10" class="radio checked:bg-blue-500" bind:group={response} value={choice} />
            </label>
        </div>
    {/each}
</div>