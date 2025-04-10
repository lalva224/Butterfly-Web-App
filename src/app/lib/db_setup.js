
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGO_URI
// connects every session
export let client;

 export async function connect() {
  if(!client){
    client  = new MongoClient(uri)
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
    }
    catch(e){
      console.log("Failed to Connect to Mongo DB:",e)
    } 
  }
  return client.db('butterfly_data')
 
}



