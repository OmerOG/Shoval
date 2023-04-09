import { Server } from 'socket.io';
import express, { json } from 'express';
import http from 'http';
import { connectToDb } from './dal/dal';
import router from './service';
import cors from 'cors';
import { exit } from 'process';
import socketConnectionManager from './socket';

const PORT = 3000;
const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/shoval';
const CORS_ORIGIN = 'http://localhost:5173';

const app = express();
app.use(cors());
app.use(json());
app.use('/', router);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: CORS_ORIGIN
    }
});

io.on('connection', socketConnectionManager);

connectToDb(CONNECTION_STRING)
    .catch((err) => {
        console.error('Failed connnecting to DB');
        exit(1);
    })
    .then(() => {
        console.log('Connected to DB');
    });

server.listen(PORT, () => {
    console.log('Up and listening on port ' + PORT);
});

