import {ReplicacheExpressServer} from 'replicache-express';
import type { WriteTransaction } from 'replicache';
import cors from 'cors'


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

// const r = ReplicacheExpressServer.start(options, () => {
//   console.log(`Server listening on ${options.host}:${options.port}`);
// });


const r = new ReplicacheExpressServer(options);

// r.app.use(express.static(default_dist));
r.app.get('/health', (_req, res) => {
  res.send('ok');
});

r.app.get('/', (_req, res) => {
  res.send('ok');
});

r.app.use(cors({
  origin: 'http://localhost:3001', //アクセス許可するオリジン
  credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
  optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}))

r.start(() => {
  console.log(
    `Replicache is listening on ${options.host}:${options.port}`,
  );
});