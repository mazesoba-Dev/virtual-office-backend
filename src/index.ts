import {ReplicacheExpressServer} from 'replicache-express';
import type { WriteTransaction } from 'replicache';
import {MongoClient}  from "mongodb" ;

const port = 3000

const mutators = {
  testMutator: async (tx: WriteTransaction) => {
   new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('こんにちは');
    }, 300);
    });
  }
}
const options = {
  mutators,
  port,
  host: process.env.HOST || '0.0.0.0',
};

const r = new ReplicacheExpressServer(options);

r.app.get('/test', (req: any, res: any)=> {
  // Connection URI
const uri = "mongodb://root:password@mongo:27017";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
try {
  // Connect the client to the server (optional starting in v4.7)
  await client.connect();


  // Establish and verify connection
  const database = client.db('development');
  const users = database.collection('user');
  await users.insertOne({name: 'taisei'})
  const result = await users.count();
  console.log("繋がってるよ〜");
  console.log(result);
} finally {
  // Ensures that the client will close when you finish/error
  await client.close();
}
}
run().catch(console.dir);
  res.send('OKだよ〜')
})

r.start(() => {
  console.log(`Server listening on ${options.host}:${options.port}`);
});
