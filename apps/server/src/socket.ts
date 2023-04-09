import { Route, Point } from '@shoval/common';
import { Socket } from 'socket.io';

export default function socketConnectionManager(socket: Socket) {
    const { userId } = socket.handshake.auth;

    console.log(`User ${userId} connected`);

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
        console.log(`User ${userId} left`);
    });
}
