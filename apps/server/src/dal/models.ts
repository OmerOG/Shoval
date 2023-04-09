import { model, Schema } from 'mongoose';
import { Route, Point } from '../types';

const routeSchema = new Schema<Route>({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    createdBy: { type: String, required: false },
    createdAt: { type: Date, required: false, default: () => new Date() },
    updatedAt: { type: Date, required: false, default: () => new Date() },
    isDeleted: { type: Boolean, default: false }
});

const pointSchema = new Schema<Point>({
    id: { type: String, unique: true, required: true },
    routeId: { type: String, required: true },
    description: { type: String, required: true },
    geography: { type: Schema.Types.Mixed, required: true },
    timestamp: { type: Date, required: true },
    createdAt: { type: Date, required: false, default: () => new Date() },
    updatedAt: { type: Date, required: false, default: () => new Date() },
    isDeleted: { type: Boolean, default: false },
    isTOKSynced: { type: Boolean, default: false }
});

export const RouteModel = model<Route>('Route', routeSchema);
export const PointModel = model<Point>('Point', pointSchema);
