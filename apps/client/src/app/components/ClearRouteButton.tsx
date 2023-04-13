import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { clearCurrentRoute } from '../state/slices/routesSlice';
import { setPoints } from '../state/slices/pointsSlice';
import { clearMapPosition } from '../state/slices/newPointSlice';

interface Props {}

export default function ClearRouteButton({}: Props) {
    const isRoute = useAppSelector((state) => Boolean(state.routes.currentRoute));
    const isRoutePublished = useAppSelector((state) => Boolean(state.routes.isRoutePublished));
    const dispatch = useAppDispatch();

    return (
        <Button
            sx={{ textTransform: 'capitalize', margin: 2 }}
            onClick={() => {
                dispatch(clearCurrentRoute());
                dispatch(setPoints([]));
                dispatch(clearMapPosition());
            }}
            startIcon={<ClearIcon />}
            disabled={!isRoute || !isRoutePublished}
        >
            Clear Route
        </Button>
    );
}
