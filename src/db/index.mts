import { MongoClient, type Db } from "mongodb";
import { MONGO_URI, DB_NAME } from "../config/index.mjs";

let database: Db;

try {
  const client = new MongoClient(MONGO_URI);
  database = client.db(DB_NAME);
} catch (err) {
  console.log("🚀 ~ file: db.ts:16 ~ err:", err);
}

export { database as db };

// "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/server.mjs\"",

// finally {
//   // Ensures that the client will close when you finish/error
//   await client.close(); }
