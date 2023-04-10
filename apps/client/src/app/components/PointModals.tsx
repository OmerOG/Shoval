import { useEffect, useState } from 'react';
import { addCameraMoveEvent } from '../services/map/events';
import { useAppSelector } from '../state/hooks';
import { Point } from '@shoval/common';
import { ScreenPosition } from '../services/map/types';
import { getScreenPositionFromMapPosition } from '../services/map/util';
import PointModal from './PointModal/PointModal';
import { selectPointsMapPositions } from '../state/slices/pointsSlice';

interface Props {}

export const MODAL_HEIGHT = 120;
export const MODAL_WIDTH = 150;
export const MODAL_OFFSET = 12;

export function PointModals({}: Props) {
    const isRouteHidden = useAppSelector((state) => state.routes.isRouteHidden);
    const points = useAppSelector<Point[]>((state) => state.points.points);
    const mapPositions = useAppSelector(selectPointsMapPositions);
    const [screenPositions, setScreenPositions] = useState<ScreenPosition[]>([]);

    const handleCameraMove = () => {
        setScreenPositions(mapPositions.map((mapPosition) => getScreenPositionFromMapPosition(mapPosition)));
    };

    useEffect(() => {
        if (points.length === 0 || isRouteHidden) return;

        handleCameraMove();
        const cleanupFunction = addCameraMoveEvent(handleCameraMove);

        return cleanupFunction;
    }, [points, isRouteHidden]);

    if (points.length === 0 || isRouteHidden) return null;

    return (
        <>
            {screenPositions.map((screenPosition, index) => {
                if (!points[index]) return null;
                return (
                    <PointModal
                        height={MODAL_HEIGHT}
                        width={MODAL_WIDTH}
                        offset={MODAL_OFFSET}
                        key={points[index].id}
                        screenPosition={screenPosition}
                        point={points[index]}
                    />
                );
            })}
        </>
    );
}
