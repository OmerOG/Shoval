import { setVisibility } from '../services/map/drawing';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { setIsRouteHidden } from '../state/slices/routesSlice';
import { clearMapPosition } from '../state/slices/newPointSlice';

interface Props {}

export default function HideRouteButton({}: Props) {
    const isRouteHidden = useAppSelector((state) => state.routes.isRouteHidden);
    const dispatch = useAppDispatch();

    return (
        <Button
            sx={{ textTransform: 'capitalize', margin: 2 }}
            onClick={() => {
                const newIsRouteHidden = !isRouteHidden;
                dispatch(setIsRouteHidden(newIsRouteHidden));
                dispatch(clearMapPosition());
                setVisibility(!newIsRouteHidden);
            }}
            variant="contained"
            startIcon={isRouteHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
        >
            {isRouteHidden ? 'Show route' : 'Hide route'}
        </Button>
    );
}
