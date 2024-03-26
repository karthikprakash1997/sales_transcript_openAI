import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL;

const dbName = process.env.DB_NAME;

const client = url ? new MongoClient(url): undefined;

//boiler plate code taken from npm documentation
export const updateDataToMongo = async (data: any) => {
  try {
    if(!client) throw new Error('Please provide a valid mongoDB address')
    await client.connect(); //connect to Cluster
    const db = client.db(dbName); //select a db
    const collection = db.collection("userChatHistory"); //select the collection we need to insert
    const insertedCollection = await collection.insertOne(data); //insert the data to DB
    return insertedCollection;
  } catch (err) {
    console.error(err);
  }
};