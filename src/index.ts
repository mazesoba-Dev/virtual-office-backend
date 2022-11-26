import {ReplicacheExpressServer} from 'replicache-express-mongo';
import type { WriteTransaction } from 'replicache';
import {MongoClient}  from "mongodb" ;
import { Request, Response } from 'express';

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
  const messages = 'messages'

  database.createCollection(messages);
  const collection = database.collection(messages)

  await collection.insertOne({
    message: 'message',
    send_user: 'taisei',
    created_at: '',
    space_id: 'default',
    version: 1
  })
} finally {
  // Ensures that the client will close when you finish/error
  await client.close();
}
}
run().catch(console.dir);
  res.send('OKだよ〜')

r.app.get("/test", (req: Request, res: Response) => {
  res.send("つながったよ")
})

r.start(() => {
  console.log(`Server listening on ${options.host}:${options.port}`);
});
