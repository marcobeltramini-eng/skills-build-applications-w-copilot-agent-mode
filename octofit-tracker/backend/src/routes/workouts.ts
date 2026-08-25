import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Workout.find().sort({ level: 1, durationMinutes: 1 }).lean();

    res.json({
      resource: 'workouts',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'workouts',
      message: 'Failed to fetch workouts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;