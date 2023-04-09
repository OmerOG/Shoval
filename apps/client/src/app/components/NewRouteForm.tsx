import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import RouteIcon from '@mui/icons-material/Route';
import Box from '@mui/material/Box';
import { setCurrentRoute, setCurrentRouteName, setIsRoutePublished } from '../state/slices/routesSlice';
import { v4 as uuid } from 'uuid';

interface Props {}

export default function NewRouteForm({}: Props) {
    const dispatch = useAppDispatch();
    const route = useAppSelector((state) => state.routes.currentRoute);
    const isPublishedRoute = useAppSelector((state) => state.routes.isPublishedRoute);

    useEffect(() => {
        if (route) return;
        dispatch(
            setCurrentRoute({
                id: uuid(),
                name: 'Draft Route',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
        );
        dispatch(setIsRoutePublished(false));
    }, []);

    return (
        <Stack width="100%" alignItems="center" textAlign="center">
            <TextField
                sx={{ marginBottom: 2 }}
                fullWidth
                label="Name"
                variant="filled"
                disabled={isPublishedRoute}
                onChange={(e) => dispatch(setCurrentRouteName(e.currentTarget.value ?? undefined))}
                placeholder="Draft Route"
            />
            {isPublishedRoute && (
                <Box color="cyan" display="flex">
                    <RouteIcon />
                    <Typography maxWidth="100%" textOverflow="ellipsis">
                        {route?.id}
                    </Typography>
                </Box>
            )}
        </Stack>
    );
}
