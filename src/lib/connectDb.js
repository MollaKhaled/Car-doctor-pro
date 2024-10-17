const { MongoClient, ServerApiVersion } = require('mongodb');
let db;

const connectDb = async () => {
if(db) return db;
try {
 
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dhrn8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(process.env.DB_USER);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
  
});
db = client.db('carDb')
return db;
}
catch(error){
  console.log(error);
}
}

export default connectDb;