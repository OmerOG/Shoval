import { connect } from 'mongoose';
import { RouteModel, PointModel } from './models';
import { Route, Point } from '@shoval/common';

export async function connectToDb(connnectionString: string): Promise<void> {
    await connect(connnectionString);
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
    return await RouteModel.find<Route>({ isDeleted: false }).sort({ updatedAt: -1 }).limit(100).exec();
}

export async function getPoints(routeId: string): Promise<Point[]> {
    return await PointModel.find<Point>({ routeId, isDeleted: false }).sort({ createdAt: 1 }).limit(100).exec();
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
