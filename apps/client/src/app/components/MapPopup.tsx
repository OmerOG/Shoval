import FloatingCard from './FloatingCard/FloatingCard';
import { MapPosition, ScreenPosition } from '../services/map/types';
import { PropsWithChildren, useEffect, useState } from 'react';
import { getScreenPositionFromMapPosition } from '../services/map/util';
import { addCameraMoveEvent } from '../services/map/events';

interface Props {
    mapPosition: MapPosition;
}

export function MapPopup({ mapPosition, children }: PropsWithChildren<Props>) {
    const [screenPosition, setScreenPosition] = useState<ScreenPosition>(getScreenPositionFromMapPosition(mapPosition));

    const handleCameraMove = () => {
        const newScreenPosition = getScreenPositionFromMapPosition(mapPosition);
        setScreenPosition(newScreenPosition);
    };

    useEffect(() => {
        handleCameraMove();
        const cleanupFunction = addCameraMoveEvent(handleCameraMove);
        return cleanupFunction;
    }, [mapPosition]);

    return <FloatingCard screenPosition={screenPosition}>{children}</FloatingCard>;
}
