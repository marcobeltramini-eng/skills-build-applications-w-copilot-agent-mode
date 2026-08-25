import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Team.find()
      .populate('captain', 'name email')
      .populate('members', 'name fitnessLevel weeklyTarget')
      .lean();

    res.json({
      resource: 'teams',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'teams',
      message: 'Failed to fetch teams',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;