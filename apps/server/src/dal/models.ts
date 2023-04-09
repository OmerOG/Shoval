import { model, Schema } from 'mongoose';
import { Route, Point, DbRoute, DbPoint } from '@shoval/common';

const routeSchema = new Schema<DbRoute>({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    createdBy: { type: String, required: false },
    createdAt: { type: Date, required: false, default: Date.now },
    updatedAt: { type: Date, required: false, default: Date.now },
    isDeleted: { type: Boolean, default: false }
});

const pointSchema = new Schema<DbPoint>({
    id: { type: String, unique: true, required: true },
    routeId: { type: String, required: true },
    description: { type: String, required: true },
    geography: { type: Schema.Types.Mixed, required: true },
    timestamp: { type: Date, required: true },
    createdAt: { type: Date, required: false, default: Date.now },
    updatedAt: { type: Date, required: false, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    isTOKSynced: { type: Boolean, default: false }
});

export const RouteModel = model<DbRoute>('Route', routeSchema);
export const PointModel = model<DbPoint>('Point', pointSchema);
