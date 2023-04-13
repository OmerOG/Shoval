import { useEffect, useState } from 'react';
import { useAppSelector } from '../state/hooks';
import { addEntityClickEvent } from '../services/map/events';
import { Point } from '@shoval/common';

export function useMapClick() {
    const points = useAppSelector((state) => state.points.points);
    const [clickedEntity, setClickedEntity] = useState<Point | null>(null);

    const handleEntityClick = (id?: string) => {
        if (!id && !clickedEntity) return;

        if (!id && clickedEntity) {
            setClickedEntity(null);
            return;
        }

        const point = points.find((point) => point.id === id);
        setClickedEntity(point ?? null);
    };

    useEffect(() => {
        const cleanupFunction = addEntityClickEvent(handleEntityClick);
        return cleanupFunction;
    }, [clickedEntity, points]);

    return clickedEntity;
}
