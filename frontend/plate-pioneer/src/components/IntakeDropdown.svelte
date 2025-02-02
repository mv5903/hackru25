<script lang="ts">
	
	
    export let isMulti: boolean;
    export let responses: string[] = [];
    export let choices: string[] = [];
    export let question: string;
  
    function handleChange(event: Event) {
      const select = event.target as HTMLSelectElement;
      const value = select.value;
      if (!value) return; // Ignore if no valid value selected
  
      if (isMulti) {
        // Only add the new response if it isn't already present.
        if (!responses.includes(value)) {
          responses = [...responses, value];
        }
        // Reset the select so that the placeholder option is shown.
        select.value = "";
      } else {
        responses = [value];
      }
    }
  
    function removeResponse(value: string) {
      responses = responses.filter((resp) => resp !== value);
    }

    // Convert THIS_CASE to This Case
    for (let i = 0; i < choices.length; i++) {
      choices[i] = choices[i].split("_").join(" ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    }
  </script>
  
  <div class="my-4">
    <p class="mb-3"><strong>{question}</strong></p>
  
    <!-- Use a placeholder option so that the user is prompted to select -->
    <select on:change={handleChange} class="select select-bordered w-full max-w-xs">
      <option value="" disabled>Select an option</option>
      {#each choices as choice}
        <option value={choice}>{choice}</option>
      {/each}
    </select>
  
    {#if isMulti && responses.length > 0}
      <div class="mt-4 flex flex-wrap justify-center place-items-center gap-2">
        {#each responses as response (response)}
          <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
            <span>{response}</span>
            <button
              class="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
              on:click={() => removeResponse(response)}
              aria-label="Remove option"
            >
              x
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  