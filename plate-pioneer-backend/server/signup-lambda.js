const { MongoClient } = require("mongodb");

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
    console.log("User ID", user_id);

    if (!user_id) {
      throw new Error("No User ID Found!");
    }

    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db(DB_NAME);
    const users = database.collection("Users");

    await users.insertOne({
      user_auth_id: user_id,
      intake_form: null,
    });

    console.log("User Added To DB");
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
    if (error.code === 11000) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({ message: "Duplicate Key In DB" }),
      };
    }
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: error }),
    };
  } finally {
    await client.close();
  }
};
