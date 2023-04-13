import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Point, Route } from '@shoval/common';
import PointForm from './PointForm/PointForm';
import moment from 'moment';
import PointDetails from './PointDetails/PointDetails';
import { thunkUpdatePoint } from '../state/thunks/pointsThunks';
import { MapPopup } from './MapPopup';
import { getMapPositionFromGeoJsonPoint } from '../services/map/util';

interface Props {
    point: Point;
}

export function ExistingPointPopup({ point }: Props) {
    const [isEditMode, setIsEditMode] = useState(false);
    const timestamp = moment(point.timestamp);

    return (
        <MapPopup mapPosition={getMapPositionFromGeoJsonPoint(point.geography)}>
            {isEditMode ? (
                <PointForm
                    defaultDate={timestamp.format('DD/MM/YYYY')}
                    defaultTime={timestamp.format('HH:mm:ss')}
                    defaultDescription={point.description}
                    handleSubmit={(timestamp, description) => thunkUpdatePoint({ ...point, timestamp, description })}
                    handleCancel={() => setIsEditMode(false)}
                />
            ) : (
                <PointDetails point={point} />
            )}
            {!isEditMode && <button onClick={() => setIsEditMode(true)}>{'Edit'}</button>}
        </MapPopup>
    );
}
