import { io } from 'socket.io-client';
import { Point, Route } from '@shoval/common';

export const socket = io('http://localhost:3000', {});

export function addPoint(point: Point): void {
    socket.emit('point', point);
}

export function updatePoint(point: Point): void {
    socket.emit('updatePoint', point);
}

export function removePoint(pointId: string): void {
    socket.emit('removePoint', pointId);
}

export function upsertRoute(route: Route): void {
    socket.emit('route', route);
}

export function removeRoute(routeId: string): void {
    socket.emit('removeRoute', routeId);
}
