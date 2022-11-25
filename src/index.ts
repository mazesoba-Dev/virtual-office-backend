import {ReplicacheExpressServer} from 'replicache-express';
import type { WriteTransaction } from 'replicache';

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

ReplicacheExpressServer.start(options, () => {
  console.log(`Server listening on ${options.host}:${options.port}`);
});
