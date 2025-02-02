<script lang="ts">
	import { onMount } from "svelte";

    interface Recipe {
      name: string;
      description: string;
      ingredients: { ingredient: string; amount: string }[];
      instructions: string[];
      photoURL: string;
    }

    let recipesArray: any[] = [];

    onMount(async () => {
        // if (!$clientAPIInstance) return;
        // const recipes = await $clientAPIInstance.getMyRecipes();;
        // recipesArray = Object.keys(recipes).map(key => [key, recipes[key]]);
    })
  </script>
  
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Added Recipes</h1>
    <!-- Loop through each recipe and render it as a collapse item -->
    <div class="space-y-4">
      {#each recipesArray as [key, recipe]}
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <div class="collapse-title text-xl font-medium">
            {recipe.name}
          </div>
          <div class="collapse-content">
            <div class="flex flex-col md:flex-row gap-4">
              <img src={recipe.photoURL} alt={""} class="w-full md:w-48 rounded shadow" />
              <div>
                <p class="mb-2">{recipe.description}</p>
                <h3 class="font-bold">Ingredients:</h3>
                <ul class="list-disc pl-5 mb-4">
                  {#each recipe.ingredients as ingredient}
                    <li class="text-left">{ingredient.amount} {ingredient.ingredient}</li>
                  {/each}
                </ul>
                <h3 class="font-bold">Instructions:</h3>
                <ol class="list-decimal pl-5">
                  {#each recipe.instructions as instruction}
                    <li class="mb-1 text-left">{instruction}</li>
                  {/each}
                </ol>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  