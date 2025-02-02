const { OpenAI } = require("openai");
const { MongoClient } = require("mongodb");

const OPENAI_API_KEY =
  "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";

exports.handler = async (event) => {
  console.log("Event:", event);
  const username = encodeURIComponent("JeetG-22");
  const password = encodeURIComponent("Jeet12345!");
  const mongodb_uri = `mongodb+srv://${username}:${password}@platepioneer.ilmm5.mongodb.net/?retryWrites=true&w=majority&appName=PlatePioneer`;
  const bodyObject = JSON.parse(event.body || "{}");
  console.log("Parsed body:", bodyObject);

  const client = new MongoClient(mongodb_uri);
  const DB_NAME = "PlatePioneer";
  try {
    const user_id = bodyObject.authID;
    const intake_form = bodyObject.intake_form;
    console.log("User ID", user_id);
    console.log("Intake Form", intake_form);

    if (!user_id) {
      throw new Error("No User ID Found!");
    }

    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db(DB_NAME);
    const users = database.collection("Users");

    // Check if auth_id exists in the collection
    const existingUser = await users.findOne({ user_auth_id: user_id });
    console.log("Existing User:", existingUser);
    if (!existingUser) {
      // If user exists, return a response indicating that the user already exists
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({ message: "User doesn't exist" }),
      };
    }
    console.log(existingUser);

    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    async function getMealSuggestions(userInput) {
      const prompt = `
      Based on the following user preferences, generate 3 possible meal ideas that meet their requirements. Each meal should have a name, instructions, key ingredients, and a simple picture. Ensure the meals follow these constraints:
${JSON.stringify(userInput, null, 2)}
Return the output in the following key-value format (json), with these keys:
meal #{
"name": string, "description": string, "ingredients": object[{"ingredient": string, "amount": string}], "instructions": string[], "photoURL": string 
}

an example would look like:
{ "meal_1": { "title": "Meal 1 Title", "description": "Meal 1 description", "ingredients": [ {"ingredient": "ingredient_name", "amount": "amount"} ], "instructions": [ "Step 1: instruction", "Step 2: instruction" ], "image_url": "image_url" }
`;

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1500,
        });
        return response.choices[0].message.content;
      } catch (error) {
        console.error("Error Generating Meals:", error);
      }
    }

    const userInput = {
      allergies: ["Peanuts", "Shellfish"],
      dietary_type: "Pescatarian",
      dietary_restrictions: ["Gluten-Free"],
      foods_to_avoid: ["Mushrooms"],
      cuisine_preferences: ["Italian", "Thai", "Mediterranean"],
      spice_tolerance_out_of_5: 3,
      meal_type: "More protein, balanced fats",
      budget_per_meal: "No preference",
      alcohol_consumption: true,
      time_available: "High effort",
    };

    response = await getMealSuggestions(userInput);
    console.log(response);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: "User Added To DB" }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: error }),
    };
  }
};
