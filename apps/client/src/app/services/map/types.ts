export type MapPosition = { latitude: number; longitude: number; height: number };

export type ScreenPosition = { screenX: number; screenY: number };

export type MapPositionEvent = MapPosition & ScreenPosition;
export type MapPositionEventCallback = (event: MapPositionEvent) => void;
