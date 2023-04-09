import axios from 'axios';
import { Point, Route } from '../types';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
});

export async function getPoints(routeId: string): Promise<Point[]> {
    return (await axiosInstance.get('points', { params: { routeId } })).data;
}

export async function upsertPoint(point: Point): Promise<void> {
    await axiosInstance.post('points', point);
}

export async function removePoint(pointId: string): Promise<void> {
    await axiosInstance.delete('points', { params: { id: pointId } });
}

export async function getRoutes(): Promise<Route[]> {
    return (await axiosInstance.get('routes')).data;
}

export async function upsertRoute(route: Route): Promise<void> {
    await axiosInstance.post('routes', route);
}

export async function removeRoute(routeId: string): Promise<void> {
    await axiosInstance.delete('routes', { params: { id: routeId } });
}
