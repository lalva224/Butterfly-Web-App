
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGO_URI
// connects every session
export let client;

 export async function connect_db() {
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
  let db =  client.db('butterfly_data')
  let butterfly_connection = db.collection("merged_butterfly_weather_data")
  return butterfly_connection
 
}



