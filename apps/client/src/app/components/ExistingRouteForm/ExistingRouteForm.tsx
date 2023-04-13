import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setCurrentRoute, setIsRoutePublished } from '../../state/slices/routesSlice';
import { thunkFetchPoints } from '../../state/thunks/pointsThunks';
import './ExistingRouteForm.less';

interface Props {}

export default function ExistingRouteForm({}: Props) {
    const route = useAppSelector((state) => state.routes.currentRoute);
    const isRoutePublished = useAppSelector((state) => state.routes.isRoutePublished);
    const routes = useAppSelector((state) =>
        state.routes.routes.map((route) => ({
            label: route.name,
            route
        }))
    );
    const disptach = useAppDispatch();

    return (
        <Autocomplete
            //@ts-ignore
            value={route && isRoutePublished ? { label: route?.name, route } : null}
            disablePortal
            options={routes}
            fullWidth
            disableClearable
            renderInput={(params) => <TextField {...params} label="Route" />}
            renderOption={(props, option) => (
                <li {...props} key={option.route.id}>
                    <div className="route-option">
                        <span className="label">{option.label}</span>
                        <span className="id">{option.route.id}</span>
                    </div>
                </li>
            )}
            isOptionEqualToValue={(option, value) => option?.route.id === value?.route.id}
            onChange={(_, value) => {
                disptach(setCurrentRoute(value.route));
                disptach(setIsRoutePublished(true));
                disptach(thunkFetchPoints(value.route.id));
            }}
        />
    );
}
