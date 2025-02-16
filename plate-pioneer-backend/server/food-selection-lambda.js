const { MongoClient } = require("mongodb");

exports.handler = async (event) => {
  console.log("Event:", event);
  const username = encodeURIComponent("JeetG-22");
  const password = encodeURIComponent("Jeet12345!");
  const mongodb_uri = `mongodb+srv://${username}:${password}@platepioneer.ilmm5.mongodb.net/?retryWrites=true&w=majority&appName=PlatePioneer`;

  const client = new MongoClient(mongodb_uri);
  const DB_NAME = "PlatePioneer";
  try {
    let user_id = null;
    let selected_meal = null;

    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db(DB_NAME);
    const users = database.collection("Users");

    const httpMethod = event.httpMethod;
    if (httpMethod === "GET") {
      user_id = event.queryStringParameters.authID;
    } else {
      const bodyObject = JSON.parse(event.body || "{}");
      console.log("Parsed body:", bodyObject);
      user_id = bodyObject.authID;
      selected_meal = bodyObject.selected_meal;
    }
    console.log("User ID", user_id);
    console.log("Selected Meal", selected_meal);

    if (!user_id) {
      throw new Error("No User ID Found!");
    }

    // Check if auth_id exists in the collection
    const existingUser = await users.findOne({ user_auth_id: user_id });
    console.log("Existing User:", existingUser);

    if (httpMethod === "GET") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify(existingUser.selected_meals),
      };
    }
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

    //update selected meals list
    await users.updateOne(
      { user_auth_id: user_id },
      { $push: { selected_meals: selected_meal } }
    );

    const result = await users.findOne({ user_auth_id: user_id });
    console.log("Updated User:", result);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(result.selected_meals),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: `Error: ${error}` }),
    };
  }
};
