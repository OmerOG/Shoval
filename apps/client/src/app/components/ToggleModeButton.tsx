import { useAppDispatch, useAppSelector } from '../state/hooks';
import { AppMode, setMode } from '../state/slices/appSlice';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { clearCurrentRoute } from '../state/slices/routesSlice';
import { clearPoints } from '../state/slices/pointsSlice';
import { clearMapPosition } from '../state/slices/newPointSlice';

interface Props {}

export default function ToggleModeButton({}: Props) {
    const mode = useAppSelector((state) => state.app.mode);
    const dispatch = useAppDispatch();

    const handleValueChanged = (_: any, value: AppMode | null) => {
        if (!value) return;

        dispatch(clearCurrentRoute());
        dispatch(clearPoints());
        dispatch(clearMapPosition());
        dispatch(setMode(value));
    };

    return (
        <ToggleButtonGroup sx={{ marginBottom: 2 }} fullWidth value={mode} exclusive onChange={handleValueChanged}>
            <ToggleButton value="view">
                <Stack alignItems="center">
                    <VisibilityIcon />
                    <Typography sx={{ textTransform: 'capitalize' }}>show</Typography>
                </Stack>
            </ToggleButton>
            <ToggleButton value="create">
                <Stack alignItems="center">
                    <CreateIcon />
                    <Typography sx={{ textTransform: 'capitalize' }}>create</Typography>
                </Stack>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
