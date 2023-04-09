import { Server } from 'socket.io';
import express, { json } from 'express';
import http from 'http';
import { connectToDb } from './dal/dal';
import { Point, Route } from './types';
import router from './service';
import cors from 'cors';

const PORT = 3000;

const app = express();
app.use(cors());
app.use(json());
app.use('/', router);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

connectToDb('mongodb://127.0.0.1:27017/shoval')
    .catch((err) => {
        console.error('Failed not connnect to DB');
    })
    .then(() => {
        console.log('Connected to DB');
    });

io.on('connection', (socket) => {
    console.log(`User ${socket.handshake.auth.userId} connected`);

    socket.on('subscribe', (routeId: string) => {
        socket.join(routeId);
    });

    socket.on('unsubscribe', (routeId: string) => {
        socket.leave(routeId);
    });

    socket.on('route', (route: Route) => {
        socket.to(route.id).emit('route', route);
    });

    socket.on('point', (point: Point) => {
        socket.to(point.routeId).emit('point', point);
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.handshake.auth.userId} left`);
    });
});

server.listen(PORT, () => {
    console.log('Up and listening on port ' + PORT);
});

