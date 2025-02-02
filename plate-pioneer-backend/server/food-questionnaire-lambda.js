const { MongoClient } = require("mongodb");

exports.handler = async (event) => {
  console.log("Event:", event);
  const username = encodeURIComponent("JeetG-22");
  const password = encodeURIComponent("Jeet12345!");
  const mongodb_uri = `mongodb+srv://${username}:${password}@platepioneer.ilmm5.mongodb.net/?retryWrites=true&w=majority&appName=PlatePioneer`;
  const bodyObject = JSON.parse(event.body || "{}");
  console.log("Parsed body:", bodyObject);
  const httpMethod = event.httpMethod;

  const client = new MongoClient(mongodb_uri);
  const DB_NAME = "PlatePioneer";
  try {
    let user_id = null;
    let intake_form = null;
    if (httpMethod === "GET") {
      user_id = event.queryStringParameters.authID;
    } else {
      user_id = bodyObject.authID;
      intake_form = bodyObject.intake_form;
    }

    console.log("User ID", user_id);

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

    // Get the intake form from the request body if "GET" method
    if (httpMethod === "GET") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify(existingUser.intake_form),
      };
    }

    // Update the user's document where the auth_id matches if "POST" method
    await users.updateOne(
      { user_auth_id: user_id }, // Filter condition to match the user
      {
        $set: { intake_form: intake_form }, // The fields to update
      }
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: "User updated successfully" }),
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
