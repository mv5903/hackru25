const { OpenAI } = require("openai");
const { MongoClient } = require("mongodb");

const OPENAI_API_KEY =
  "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";

const DB_NAME = "PlatePioneer";

// Initialize MongoDB client outside the handler to reuse it across requests
let client;
let db;

const connectToMongoDB = async () => {
  if (client) {
    // Reuse the existing client if it's already connected
    console.log("Reusing existing MongoDB connection");
    return db;
  }

  const username = encodeURIComponent("JeetG-22");
  const password = encodeURIComponent("Jeet12345!");
  const mongodb_uri = `mongodb+srv://${username}:${password}@platepioneer.ilmm5.mongodb.net/?retryWrites=true&w=majority&appName=PlatePioneer`;

  client = new MongoClient(mongodb_uri);
  await client.connect();
  db = client.db(DB_NAME);
  console.log("Connected to MongoDB");

  return db;
};

exports.handler = async (event) => {
  console.log("Event:", event);

  try {
    const user_id = event.queryStringParameters.authID;
    console.log("User ID", user_id);

    if (!user_id) {
      throw new Error("No User ID Found!");
    }

    const database = await connectToMongoDB();
    const users = database.collection("Users");

    // Check if auth_id exists in the collection
    const existingUser = await users.findOne({ user_auth_id: user_id });
    console.log("Existing User:", existingUser);
    if (!existingUser) {
      // If user doesn't exist, return a response indicating that the user doesn't exists
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({ message: "User doesn't exist" }),
      };
    }
    const intake_data = existingUser.intake_form;
    const selected_meals = existingUser.selected_meals;

    //execute prompt for meal suggestions
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    const userInput = {
      allergies: intake_data.allergies,
      meat_status: intake_data.meatStatus,
      dietary_preferences: intake_data.dietaryPreferences,
      foods_to_avoid: intake_data.avoidFoods,
      cuisine_preferences: intake_data.cuisinePreferences,
      spice_tolerance_out_of_5: intake_data.spiceTolerance,
      meal_type: intake_data.mealTypes,
      budget_per_meal: intake_data.budget,
      alcohol_consumption: intake_data.alcoholAllowed,
      time_available: intake_data.timeToCook,
    };

    let prompt = `
      Based on the following user preferences, generate 3 possible meal ideas that meet their requirements. 
      Each meal should have a name, instructions, key ingredients, and a simple picture. Ensure the meals follow these constraints:
      ${JSON.stringify(userInput, null, 2)}`;

    //add additional prompt
    selected_meals_names = [];
    if (selected_meals && selected_meals.length > 0) {
      for (meal of selected_meals) {
        selected_meals_names.push(meal.name);
      }
      prompt += `
        The user has previously selected the following meals. Please use this information to provide more tailored and refined suggestions that match their preferences:
        ${JSON.stringify(selected_meals_names, null, 2)}\n`;
    }
    prompt += `
      Return the output in the following key-value format (json), with these keys:

      meal #{
      "name": string, "description": string, "ingredients": object[{"ingredient": string, "amount": string}], "instructions": string[], "photoURL": string 
      }

      an example would look like:
      { "meal_1": { "title": "Meal 1 Title", "description": "Meal 1 description", "ingredients": [ {"ingredient": "ingredient_name", "amount": "amount"} ],
       "instructions": [ "Step 1: instruction", "Step 2: instruction" ], "image_url": "image_url" }`;

    console.log("Prompt:", prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
    });
    console.log("Response:", response);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(response.choices[0].message.content),
    };
  } catch (error) {
    console.error("Error generating meal suggestions:", error);
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: "Error Generating Meals:", error }),
    };
  }
};
