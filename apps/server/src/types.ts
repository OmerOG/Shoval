import { Point as GeoJsonPoint } from 'geojson';

export interface Route {
    id: string;
    name: string;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
}

export interface Point {
    id: string;
    routeId: string;
    description: string;
    geography: GeoJsonPoint;
    timestamp: Date;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
    isTOKSynced?: boolean;
}
