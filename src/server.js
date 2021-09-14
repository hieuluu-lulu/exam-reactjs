/** @format */

const jsonServer = require('json-server');
const auth = require('json-server-auth');
const moment = require('moment');

const server = jsonServer.create();
const router = jsonServer.router('./db/db.json');

const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = moment().valueOf();
    req.body.updatedAt = moment().valueOf();
  }

  if (req.method === 'PUT') {
    req.method = 'PATCH';
  }

  if (req.method === 'PATCH') {
    req.body.updatedAt = moment().valueOf();
  }

  next();
});
const PORT = 3001;
server.use(auth);
server.use(router);
server.listen(PORT, () => console.log(`Server is running on port:${PORT}`));