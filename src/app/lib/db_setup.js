
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGO_URI
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

 export async function connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      return client.db('butterfly_data')
    }
    catch(e){
      console.log("Failed to Connect to Mongo DB:",e)
    } 
 
}



