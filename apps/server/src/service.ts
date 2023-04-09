import express, { Request, Response } from 'express';
import { getPoints, getRoutes, upsertPoint, upsertRoute } from './dal/dal';
import { Point, Route } from '@shoval/common';

const router = express.Router();

router.get('/routes', async (req: Request, res: Response) => {
    try {
        const routes = await getRoutes();
        return res.status(200).send(routes);
    } catch {
        return res.status(500);
    }
});

router.post('/routes', async (req: Request<any, any, Route>, res: Response) => {
    try {
        const route = req.body;
        await upsertRoute(route);
        return res.status(200).send();
    } catch {
        return res.status(500).send();
    }
});

router.get('/points', async (req: Request<any, any, any, { routeId: string }>, res: Response) => {
    const { routeId } = req.query;

    try {
        const points = await getPoints(routeId);
        return res.status(200).send(points);
    } catch {
        return res.status(500);
    }
});

router.post('/points', async (req: Request<any, any, Point>, res: Response) => {
    try {
        const point = req.body;
        await upsertPoint(point);
        return res.status(200).send();
    } catch {
        return res.status(500).send();
    }
});

export default router;
