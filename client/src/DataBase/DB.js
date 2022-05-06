const MongoClient = require("mongoose").MongoClient;

const url = "mongodb+srv://Vlad:fictionlibDb@fictionlib.pgftb.mongodb.net/FictionLib?retryWrites=true&w=majority";
const client = new MongoClient(url);


const start = async() =>{
  try{
    await client.connect()
    console.log('done');
    await client.db().createCollection('fictions');
  } catch (e){
    console.log(e);
  }
}

start()
