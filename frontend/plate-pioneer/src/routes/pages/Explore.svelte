<script lang="ts">
  import { clientAPIInstance } from "$lib/stores/clientAPIStore";
  import { onMount } from "svelte";

  // Assume each recipe is stored as a tuple [key, recipeObject]
  let activeRecipes: any[] = [];
  let loadingMore = true;

  // Track the current slide index (0-based)
  let currentSlide = 0;

  // This function loads and appends new recipes
  async function getRecipes() {
    if ($clientAPIInstance) {
      try {
        const recipes = JSON.parse(await $clientAPIInstance.getRecipeRecommendations());
        // Convert the recipe object to an array of [key, recipe] pairs
        const newRecipes = Object.keys(recipes).map(key => [key, recipes[key]]);
        activeRecipes = [...activeRecipes, ...newRecipes];
      } catch (e) {
        // You may want to handle errors more gracefully
        await getRecipes();
      }
    }
    loadingMore = false;
  }

  // Called when the component is first mounted.
  onMount(async () => {
    await getRecipes();
  });

  // This function handles a click on the next button.
  async function handleNextClick(index: number) {
    // Do nothing if we're currently loading more recipes.
    if (loadingMore) return;

    // Advance to the next slide (this is your own way to keep track of the visible slide)
    currentSlide = index + 1;

    // If the new slide is the third slide of the current subset, disable the next button,
    // load more recipes, then re-enable the button.
    // (Since currentSlide is 0-based, the third slide in a group is when (currentSlide + 1) % 3 === 0.)
    if ((currentSlide + 1) % 3 === 0) {
      loadingMore = true;
      // Here you might want to add additional UI feedback for disabling the button.
      await getRecipes();
      loadingMore = false;
    }
  }

  async function onAddRecipe(recipe: any) {
    if ($clientAPIInstance) {
      await $clientAPIInstance.addToFoodSelection(recipe);
    }
  }
</script>

<!-- Carousel Container -->
<div class="carousel w-full h-[75vh]">
  {#each activeRecipes as [key, recipe], index}
    <!-- Each slide has a unique id (e.g., slide1, slide2, ...) -->
    <div id={"slide" + (index + 1)} class="carousel-item relative w-full">
      <div class="card bg-base-100 shadow-xl mx-auto h-full w-3/4">
        <figure>
          <img src={recipe.photoURL} alt={recipe.name} class="object-cover h-48 w-full" />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold text-left">{recipe.name}</h2>
          <p class="text-gray-500 text-left">{recipe.description}</p>

          <!-- Ingredients (using a DaisyUI collapse component) -->
          <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-4">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium text-left">Ingredients</div>
            <div class="collapse-content">
              <ul class="list-disc list-inside">
                {#each recipe.ingredients as item}
                  <li class="text-left">{item.amount} of {item.ingredient}</li>
                {/each}
              </ul>
            </div>
          </div>

          <!-- Instructions (using another DaisyUI collapse component) -->
          <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-4">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium text-left">Instructions</div>
            <div class="collapse-content">
              <ol class="list-decimal list-inside">
                {#each recipe.instructions as step}
                  <li class="mb-1 text-left">{step}</li>
                {/each}
              </ol>
            </div>
          </div>

          <div class="card-actions justify-end">
            <button on:click={() => onAddRecipe(recipe)} class="btn btn-primary">Add Recipe</button>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <!-- Previous Button -->
        <a
          href={"#slide" + (index === 0 ? activeRecipes.length : index)}
          class="btn btn-circle"
        >
          {"❮"}
        </a>
        <!-- Next Button -->
        <a
          href={"#slide" + (index + 2 > activeRecipes.length ? 1 : index + 2)}
          class="btn btn-circle"
          on:click={() => handleNextClick(index)}
          disabled={loadingMore && ((currentSlide + 1) % 3 === 0)}
        >
          {"❯"}
        </a>
      </div>
    </div>
  {/each}

  {#if loadingMore}
    <div class="fixed right-0 bottom-20 z-100 mx-auto w-full flex justify-center items-center">
      <p class="text-sm me-3"><i>Loading recipe recommendations...</i></p>
      <span class="loading loading-spinner loading-xs"></span>
    </div>
  {/if}
</div>
