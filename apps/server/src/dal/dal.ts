import { connect } from 'mongoose';
import { RouteModel, PointModel } from './models';
import { Route, Point } from '../types';

export async function connectToDb(connnectionString: string): Promise<void> {
    try {
        await connect(connnectionString);
    } catch (err: any) {
        console.error('Could not connect to MongoDB', err);
        return;
    }

    console.error('Connected to DB');
}

export async function upsertRoute(route: Route): Promise<void> {
    const routeDocument = new RouteModel(route);

    try {
        await routeDocument.save();
    } catch (err: any) {
        console.error('Failed upserting route to DB', err);
        throw err;
    }

    console.info('Successfully upserted route to DB');
}

export async function getRoutes(): Promise<Route[]> {
    return await RouteModel.find({ isDeleted: false }).sort({ updatedAt: -1 }).limit(100).exec();
}

export async function getPoints(routeId: string): Promise<Point[]> {
    return await PointModel.find({ routeId, isDeleted: false }).sort({ createdAt: 1 }).limit(100).exec();
}

export async function upsertPoint(point: Point): Promise<void> {
    const pointDocument = new PointModel(point);

    try {
        await pointDocument.save();
    } catch (err: any) {
        console.error('Failed upserting point to DB', err);
        throw err;
    }

    console.info('Successfully upserted point to DB');
}
