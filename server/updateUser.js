import dotenv from "dotenv";
import { pathToArray } from "graphql/jsutils/Path";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config({path: './../.env'});

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

async function updateUser() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db(dbName);
    const users = database.collection("users");

    const userId = "66b9bac0d0529c5498b7bd0b"; // Replace with the user ID you want to update
    const filter = { _id: new ObjectId(userId) };
    const updateDoc = {
      $set: {
        coins: 1000,
      },
    };

    const result = await users.updateOne(filter, updateDoc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );

    // Verify the update
    const updatedUser = await users.findOne(filter);
    console.log("Updated user:", updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

updateUser().catch(console.error);
