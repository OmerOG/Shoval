import { Point as GeoJsonPoint } from 'geojson';

export interface Route {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    createdBy?: string;
    isDeleted?: boolean;
}

export interface Point {
    id: string;
    routeId: string;
    description: string;
    geography: GeoJsonPoint;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
    isDeleted?: boolean;
    isTOKSynced?: boolean;
}

export interface DbRoute extends Omit<Route, 'createdAt' | 'updatedAt'> {
    createdAt: Date;
    updatedAt: Date;
}

export interface DbPoint extends Omit<Point, 'timestamp' | 'createdAt' | 'updatedAt'> {
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;
}
