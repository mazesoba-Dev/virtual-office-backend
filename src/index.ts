import {ReplicacheExpressServer} from 'replicache-express-mongo';
import type { WriteTransaction } from 'replicache';
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

const r = new ReplicacheExpressServer(options)

r.app.get("/test", (req: Request, res: Response) => {
  res.send("つながったよ")
})

r.start(() => {
  console.log(`Server listening on ${options.host}:${options.port}`);
});
