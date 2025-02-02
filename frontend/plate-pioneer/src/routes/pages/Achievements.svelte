<script lang="ts">
const achievements = [
  {
    "id": 1,
    "name": "First Recipe",
    "descriptionIncomplete": "Add your first recipe",
    "descriptionComplete": "You added your first recipe!",
    "icon": "fa-book",
    "complete": false
  },
  {
    "id": 2,
    "name": "2 Proteins",
    "descriptionIncomplete": "Add a recipe with two sources of protein",
    "descriptionComplete": "You added a recipe with two sources of protein!",
    "icon": "fa-drumstick-bite",
    "complete": true
  },
  {
    "id": 3,
    "name": "Microwave Magic",
    "descriptionIncomplete": "Heat something in the microwave without causing a mini-explosion",
    "descriptionComplete": "You tamed the microwave like a kitchen wizard!",
    "icon": "fa-bolt",
    "complete": true
  },
  {
    "id": 4,
    "name": "Burnt Toast",
    "descriptionIncomplete": "Accidentally char your toast to a crisp",
    "descriptionComplete": "Your toast is now permanently engraved in kitchen history!",
    "icon": "fa-fire",
    "complete": false
  },
  {
    "id": 5,
    "name": "Kitchen Chaos",
    "descriptionIncomplete": "Cause a minor kitchen disaster by dropping something important",
    "descriptionComplete": "Your kitchen turned into a fun mess zone!",
    "icon": "fa-exclamation-triangle",
    "complete": true
  },
  {
    "id": 6,
    "name": "Spice it Up",
    "descriptionIncomplete": "Dare to use a spice you've never tried before",
    "descriptionComplete": "Your taste buds went on a wild adventure!",
    "icon": "fa-pepper-hot",
    "complete": false
  },
  {
    "id": 7,
    "name": "The Great Flipper",
    "descriptionIncomplete": "Flip a pancake or omelette perfectly on the first try",
    "descriptionComplete": "You flipped your food like a true culinary acrobat!",
    "icon": "fa-utensils",
    "complete": false
  },
  {
    "id": 8,
    "name": "Egg-cellent Start",
    "descriptionIncomplete": "Crack an egg without any shells falling in",
    "descriptionComplete": "Egg-cellence achieved!",
    "icon": "fa-egg",
    "complete": false
  },
  {
    "id": 9,
    "name": "Cheesy Delight",
    "descriptionIncomplete": "Melt cheese to perfection",
    "descriptionComplete": "Your cheese melt is the talk of the town!",
    "icon": "fa-cheese",
    "complete": false
  },
  {
    "id": 10,
    "name": "Carrot Crusader",
    "descriptionIncomplete": "Chop carrots without turning them into mush",
    "descriptionComplete": "Your carrots are crunchy and courageous!",
    "icon": "fa-carrot",
    "complete": false
  },
  {
    "id": 11,
    "name": "Smoothie Operator",
    "descriptionIncomplete": "Blend a smoothie without any splatters",
    "descriptionComplete": "Your smoothie is smoother than a jazz tune!",
    "icon": "fa-blender",
    "complete": false
  },
  {
    "id": 12,
    "name": "Salad Savant",
    "descriptionIncomplete": "Make a salad that doesn't involve just lettuce",
    "descriptionComplete": "Your salad is a masterpiece!",
    "icon": "fa-leaf",
    "complete": false
  },
  {
    "id": 13,
    "name": "Pasta Perfection",
    "descriptionIncomplete": "Boil pasta to al dente perfection",
    "descriptionComplete": "Your pasta game is strong!",
    "icon": "fa-pizza-slice",
    "complete": false
  },
  {
    "id": 14,
    "name": "Rice Rookie",
    "descriptionIncomplete": "Cook rice without it sticking or burning",
    "descriptionComplete": "Your rice is light and fluffy!",
    "icon": "fa-bowl-rice",
    "complete": false
  },
  {
    "id": 15,
    "name": "Saucy Situation",
    "descriptionIncomplete": "Make a sauce without it turning into a disaster",
    "descriptionComplete": "Your sauce is smooth and saucy!",
    "icon": "fa-bottle-water",
    "complete": false
  },
  {
    "id": 16,
    "name": "Baking Bravery",
    "descriptionIncomplete": "Bake something that doesn't deflate immediately",
    "descriptionComplete": "Your baked goods are rising to the occasion!",
    "icon": "fa-birthday-cake",
    "complete": false
  },
  {
    "id": 17,
    "name": "Sizzling Success",
    "descriptionIncomplete": "Fry something without causing too many splatters",
    "descriptionComplete": "Your frying technique is sizzling hot!",
    "icon": "fa-fire",
    "complete": false
  },
  {
    "id": 18,
    "name": "Herb Hero",
    "descriptionIncomplete": "Use fresh herbs instead of the dried ones",
    "descriptionComplete": "Your dish is fresh and fragrant!",
    "icon": "fa-leaf",
    "complete": false
  },
  {
    "id": 19,
    "name": "Zesty Zing",
    "descriptionIncomplete": "Add a dash of lemon or lime for extra zest",
    "descriptionComplete": "Your dish got a zesty makeover!",
    "icon": "fa-lemon",
    "complete": false
  },
  {
    "id": 20,
    "name": "Bubbly Brew",
    "descriptionIncomplete": "Brew a perfect cup of coffee or tea",
    "descriptionComplete": "Your beverage is brewed to perfection!",
    "icon": "fa-coffee",
    "complete": false
  },
  {
    "id": 21,
    "name": "Veggie Virtuoso",
    "descriptionIncomplete": "Incorporate a variety of vegetables in one dish",
    "descriptionComplete": "Your dish is a garden of flavors!",
    "icon": "fa-seedling",
    "complete": false
  },
  {
    "id": 22,
    "name": "Dough Whisperer",
    "descriptionIncomplete": "Knead dough until it’s just right",
    "descriptionComplete": "Your dough obeyed your every command!",
    "icon": "fa-bread-slice",
    "complete": false
  },
  {
    "id": 23,
    "name": "Grill Guru",
    "descriptionIncomplete": "Grill something to perfection without charring it",
    "descriptionComplete": "You're the master of the grill!",
    "icon": "fa-fire",
    "complete": false
  },
  {
    "id": 24,
    "name": "Soup-er Star",
    "descriptionIncomplete": "Simmer a soup until all flavors meld together",
    "descriptionComplete": "Your soup warmed hearts and tummies!",
    "icon": "fa-mug-hot",
    "complete": false
  },
  {
    "id": 25,
    "name": "Mix Master",
    "descriptionIncomplete": "Create a cocktail or mocktail with at least three ingredients",
    "descriptionComplete": "Your mixology skills are legendary!",
    "icon": "fa-cocktail",
    "complete": false
  },
  {
    "id": 26,
    "name": "Bubbly Banter",
    "descriptionIncomplete": "Make a sparkling water drink that's refreshing",
    "descriptionComplete": "Your bubbly concoction is a hit!",
    "icon": "fa-water",
    "complete": false
  },
  {
    "id": 27,
    "name": "Frozen Fun",
    "descriptionIncomplete": "Make your own ice pops or granita",
    "descriptionComplete": "Your frozen treat is a cool masterpiece!",
    "icon": "fa-ice-cream",
    "complete": false
  },
  {
    "id": 28,
    "name": "Nutty Notion",
    "descriptionIncomplete": "Incorporate nuts in a recipe in an unexpected way",
    "descriptionComplete": "Your dish has gone nuts—in a good way!",
    "icon": "fa-tree",
    "complete": false
  },
  {
    "id": 29,
    "name": "Whisk Taker",
    "descriptionIncomplete": "Whisk an ingredient vigorously without losing your grip",
    "descriptionComplete": "Your whisking was bold and daring!",
    "icon": "fa-wind",
    "complete": false
  },
  {
    "id": 30,
    "name": "Sourdough Starter",
    "descriptionIncomplete": "Begin your sourdough journey",
    "descriptionComplete": "Your sourdough starter is bubbling with potential!",
    "icon": "fa-leaf",
    "complete": false
  },
  {
    "id": 31,
    "name": "Batter Up",
    "descriptionIncomplete": "Make a perfect batter without lumps",
    "descriptionComplete": "Your batter is smoother than a jazz solo!",
    "icon": "fa-bacon",
    "complete": false
  },
  {
    "id": 32,
    "name": "Culinary Comedian",
    "descriptionIncomplete": "Make a dish that makes someone smile unexpectedly",
    "descriptionComplete": "Your cooking brought laughter to the table!",
    "icon": "fa-smile",
    "complete": false
  },
  {
    "id": 33,
    "name": "Perfect Plating",
    "descriptionIncomplete": "Plate a dish that looks as good as it tastes",
    "descriptionComplete": "Your presentation deserves a standing ovation!",
    "icon": "fa-portrait",
    "complete": false
  },
  {
    "id": 34,
    "name": "Midnight Snack",
    "descriptionIncomplete": "Prepare a snack after midnight without waking the house",
    "descriptionComplete": "Your stealth snack is a masterpiece!",
    "icon": "fa-moon",
    "complete": false
  },
  {
    "id": 35,
    "name": "Leftover Legend",
    "descriptionIncomplete": "Transform leftovers into a brand-new dish",
    "descriptionComplete": "You turned yesterday's meal into today's feast!",
    "icon": "fa-recycle",
    "complete": false
  },
  {
    "id": 36,
    "name": "Sweet Tooth",
    "descriptionIncomplete": "Bake or prepare a dessert that impresses",
    "descriptionComplete": "Your dessert is sugar, spice, and everything nice!",
    "icon": "fa-cookie",
    "complete": false
  },
  {
    "id": 37,
    "name": "Flambé Finesse",
    "descriptionIncomplete": "Perform a flambé without setting off the fire alarm",
    "descriptionComplete": "You ignited the culinary arts!",
    "icon": "fa-fire-alt",
    "complete": false
  },
  {
    "id": 38,
    "name": "Herbal Harmony",
    "descriptionIncomplete": "Craft a dish where herbs sing in unison",
    "descriptionComplete": "Your dish is an herbaceous symphony!",
    "icon": "fa-music",
    "complete": false
  },
  {
    "id": 39,
    "name": "Crispy Creation",
    "descriptionIncomplete": "Make something that achieves the perfect crunch",
    "descriptionComplete": "Your creation is crunch-tastically awesome!",
    "icon": "fa-utensils",
    "complete": false
  },
  {
    "id": 40,
    "name": "Global Gourmet",
    "descriptionIncomplete": "Prepare a dish from a cuisine you've never tried",
    "descriptionComplete": "You've conquered a new culinary frontier!",
    "icon": "fa-globe",
    "complete": false
  },
  {
    "id": 41,
    "name": "Sushi Sensei",
    "descriptionIncomplete": "Roll sushi or create a sushi-inspired dish",
    "descriptionComplete": "You're the master of the sushi roll!",
    "icon": "fa-fish",
    "complete": false
  },
  {
    "id": 42,
    "name": "Pancake Pro",
    "descriptionIncomplete": "Flip a pancake without it sticking to the ceiling",
    "descriptionComplete": "Your pancake flip is nothing short of acrobatic!",
    "icon": "fa-apple-alt",
    "complete": false
  },
  {
    "id": 43,
    "name": "Burger Boss",
    "descriptionIncomplete": "Assemble a burger that's both towering and tasty",
    "descriptionComplete": "Your burger is the king of comfort food!",
    "icon": "fa-hamburger",
    "complete": false
  },
  {
    "id": 44,
    "name": "Noodle Ninja",
    "descriptionIncomplete": "Prepare noodles in a style that impresses",
    "descriptionComplete": "You slashed through the noodles with precision!",
    "icon": "fa-spoon",
    "complete": false
  },
  {
    "id": 45,
    "name": "Epicurean Explorer",
    "descriptionIncomplete": "Try an ingredient from a far-off land",
    "descriptionComplete": "Your taste adventure knows no bounds!",
    "icon": "fa-compass",
    "complete": false
  },
  {
    "id": 46,
    "name": "Saucy Artist",
    "descriptionIncomplete": "Drizzle sauce in an artistic manner",
    "descriptionComplete": "Your sauce is a work of art!",
    "icon": "fa-paint-brush",
    "complete": false
  },
  {
    "id": 47,
    "name": "Fermentation Fanatic",
    "descriptionIncomplete": "Try fermenting something at home",
    "descriptionComplete": "Your fermented creation is a tangy triumph!",
    "icon": "fa-vial",
    "complete": false
  },
  {
    "id": 48,
    "name": "Bento Boss",
    "descriptionIncomplete": "Assemble a bento box that's both cute and balanced",
    "descriptionComplete": "Your bento box is a miniature culinary marvel!",
    "icon": "fa-box",
    "complete": false
  },
  {
    "id": 49,
    "name": "Caffeine Connoisseur",
    "descriptionIncomplete": "Brew a coffee that rivals the best cafes",
    "descriptionComplete": "Your coffee is a masterpiece in a cup!",
    "icon": "fa-mug-hot",
    "complete": false
  },
  {
    "id": 50,
    "name": "Kitchen Time Traveler",
    "descriptionIncomplete": "Cook a recipe from an ancient cookbook",
    "descriptionComplete": "You bridged the culinary ages!",
    "icon": "fa-clock",
    "complete": false
  }
];


    const userCompletedAchievements = [
        {
            "id": 1,
            "complete": false
        }
    ];

    const achievementsWithUserData = achievements.map(achievement => {
        const userAchievement = userCompletedAchievements.find(userAchievement => userAchievement.id === achievement.id);
        return {
            ...achievement,
            complete: userAchievement ? userAchievement.complete : false
        };
    });
</script>

<div class="grid grid-cols-3 gap-4">
    {#each achievements as achievement, i}
        <div class={`card w-full bg-base-100 shadow-xl ${achievement.complete && "opacity-25"}`}>
            <div class="card-body">
                <h2 class="card-title">{achievement.name}</h2>
                {#if achievement.complete}
                    <p class="text-left">{achievement.descriptionComplete}</p>
                    <button class="btn bg-success disabled text-black">Completed</button>
                {:else}
                    <p class="text-left">{achievement.descriptionIncomplete}</p>
                    <button class="btn btn-primary">Mark as Complete</button>
                {/if}
            </div>
        </div>
    {/each}
</div>