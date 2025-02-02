<script lang="ts">
    interface Recipe {
      name: string;
      description: string;
      ingredients: { ingredient: string; amount: string }[];
      instructions: string[];
      photoURL: string;
    }
  
    let currentRecipes: { [key: string]: Recipe } = {
      meal_1: {
        name: "Lemon Garlic Butter Shrimp with Zucchini Noodles",
        description:
          "A light and flavorful Mediterranean-inspired dish featuring succulent shrimp, zucchini noodles, and a rich lemon garlic butter sauce.",
        ingredients: [
          { ingredient: "shrimp", amount: "1 lb" },
          { ingredient: "zucchini", amount: "3 medium" },
          { ingredient: "butter", amount: "3 tbsp" },
          { ingredient: "garlic", amount: "4 cloves, minced" },
          { ingredient: "lemon juice", amount: "2 tbsp" },
          { ingredient: "olive oil", amount: "1 tbsp" },
          { ingredient: "parsley", amount: "2 tbsp, chopped" },
          { ingredient: "salt", amount: "to taste" },
          { ingredient: "black pepper", amount: "to taste" },
          { ingredient: "red pepper flakes", amount: "1/4 tsp" }
        ],
        instructions: [
          "Spiralize the zucchini into noodles and set aside.",
          "Heat olive oil in a large skillet over medium heat. Add shrimp, salt, and pepper, and cook until pink (about 2-3 minutes per side). Remove shrimp and set aside.",
          "In the same skillet, melt butter and add minced garlic. Sauté for 1-2 minutes until fragrant.",
          "Add lemon juice, red pepper flakes, and zucchini noodles. Toss to coat and cook for 2-3 minutes until noodles are tender.",
          "Return shrimp to the skillet, toss everything together, and garnish with parsley. Serve immediately."
        ],
        photoURL: "https://example.com/lemon-garlic-butter-shrimp.jpg"
      },
      meal_2: {
        name: "Thai Green Curry with Tofu and Vegetables",
        description:
          "A fragrant and mildly spicy Thai green curry made with tofu, bell peppers, and green beans, served over jasmine rice.",
        ingredients: [
          { ingredient: "firm tofu", amount: "14 oz, cubed" },
          { ingredient: "green curry paste", amount: "2 tbsp" },
          { ingredient: "coconut milk", amount: "1 can (13.5 oz)" },
          { ingredient: "bell peppers", amount: "2, sliced" },
          { ingredient: "green beans", amount: "1 cup" },
          { ingredient: "basil leaves", amount: "1/4 cup" },
          { ingredient: "fish sauce", amount: "1 tbsp" },
          { ingredient: "brown sugar", amount: "1 tsp" },
          { ingredient: "jasmine rice", amount: "1 cup, cooked" },
          { ingredient: "vegetable oil", amount: "1 tbsp" }
        ],
        instructions: [
          "Heat vegetable oil in a large pan over medium heat. Add tofu and cook until golden brown on all sides. Remove and set aside.",
          "In the same pan, add green curry paste and sauté for 1-2 minutes until fragrant.",
          "Pour in coconut milk, fish sauce, and brown sugar. Stir to combine.",
          "Add bell peppers and green beans. Simmer for 5-7 minutes until vegetables are tender.",
          "Return tofu to the pan and stir in basil leaves. Serve hot over jasmine rice."
        ],
        photoURL: "https://example.com/thai-green-curry-tofu.jpg"
      },
      meal_3: {
        name: "Grilled Salmon with Quinoa and Avocado Salsa",
        description:
          "A protein-packed meal featuring grilled salmon, fluffy quinoa, and a refreshing avocado salsa.",
        ingredients: [
          { ingredient: "salmon fillets", amount: "2 (6 oz each)" },
          { ingredient: "quinoa", amount: "1 cup, cooked" },
          { ingredient: "avocado", amount: "1, diced" },
          { ingredient: "cherry tomatoes", amount: "1/2 cup, halved" },
          { ingredient: "red onion", amount: "1/4 cup, finely chopped" },
          { ingredient: "cilantro", amount: "2 tbsp, chopped" },
          { ingredient: "lime juice", amount: "2 tbsp" },
          { ingredient: "olive oil", amount: "1 tbsp" },
          { ingredient: "salt", amount: "to taste" },
          { ingredient: "black pepper", amount: "to taste" }
        ],
        instructions: [
          "Preheat grill to medium-high heat. Season salmon fillets with salt, pepper, and a drizzle of olive oil.",
          "Grill salmon for 4-5 minutes per side until cooked through.",
          "In a bowl, combine avocado, cherry tomatoes, red onion, cilantro, and lime juice to make the salsa.",
          "Serve grilled salmon over cooked quinoa and top with avocado salsa."
        ],
        photoURL: "https://example.com/grilled-salmon-quinoa.jpg"
      },
      meal_4: {
        name: "Mediterranean Tuna Salad Bowl",
        description:
          "A hearty and healthy bowl featuring tuna, chickpeas, cucumbers, and a tangy lemon-dill dressing.",
        ingredients: [
          { ingredient: "canned tuna", amount: "2 cans (5 oz each)" },
          { ingredient: "chickpeas", amount: "1 cup, cooked" },
          { ingredient: "cucumber", amount: "1, diced" },
          { ingredient: "cherry tomatoes", amount: "1/2 cup, halved" },
          { ingredient: "red onion", amount: "1/4 cup, finely chopped" },
          { ingredient: "kalamata olives", amount: "1/4 cup, sliced" },
          { ingredient: "feta cheese", amount: "1/4 cup, crumbled" },
          { ingredient: "olive oil", amount: "2 tbsp" },
          { ingredient: "lemon juice", amount: "1 tbsp" },
          { ingredient: "dill", amount: "1 tbsp, chopped" },
          { ingredient: "salt", amount: "to taste" },
          { ingredient: "black pepper", amount: "to taste" }
        ],
        instructions: [
          "In a large bowl, combine tuna, chickpeas, cucumber, cherry tomatoes, red onion, and olives.",
          "In a small bowl, whisk together olive oil, lemon juice, dill, salt, and pepper to make the dressing.",
          "Pour the dressing over the salad and toss to combine.",
          "Top with crumbled feta cheese and serve immediately."
        ],
        photoURL: "https://example.com/mediterranean-tuna-salad.jpg"
      },
      meal_5: {
        name: "Spicy Garlic Prawn Pasta (Gluten-Free)",
        description:
          "A quick and flavorful Italian-inspired dish featuring gluten-free pasta, prawns, and a spicy garlic tomato sauce.",
        ingredients: [
          { ingredient: "gluten-free pasta", amount: "8 oz" },
          { ingredient: "prawns", amount: "1 lb, peeled and deveined" },
          { ingredient: "garlic", amount: "4 cloves, minced" },
          { ingredient: "cherry tomatoes", amount: "1 cup, halved" },
          { ingredient: "red chili flakes", amount: "1/2 tsp" },
          { ingredient: "white wine", amount: "1/4 cup" },
          { ingredient: "olive oil", amount: "2 tbsp" },
          { ingredient: "parsley", amount: "2 tbsp, chopped" },
          { ingredient: "salt", amount: "to taste" },
          { ingredient: "black pepper", amount: "to taste" }
        ],
        instructions: [
          "Cook gluten-free pasta according to package instructions. Drain and set aside.",
          "Heat olive oil in a large skillet over medium heat. Add garlic and red chili flakes, and sauté for 1-2 minutes until fragrant.",
          "Add prawns and cook until pink (about 2-3 minutes per side). Remove prawns and set aside.",
          "In the same skillet, add cherry tomatoes and white wine. Simmer for 5 minutes until tomatoes soften.",
          "Return prawns to the skillet, add cooked pasta, and toss to combine. Garnish with parsley and serve."
        ],
        photoURL: "https://example.com/spicy-garlic-prawn-pasta.jpg"
      }
    };
  
    // Convert recipes to an array for easy iteration.
    const recipesArray = Object.entries(currentRecipes);
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
  