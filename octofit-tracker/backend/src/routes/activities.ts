import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Activity.find()
      .sort({ performedAt: -1 })
      .populate('user', 'name fitnessLevel')
      .populate('team', 'name city')
      .lean();

    res.json({
      resource: 'activities',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'activities',
      message: 'Failed to fetch activities',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;