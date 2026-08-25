import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await User.find().populate('team', 'name city').lean();

    res.json({
      resource: 'users',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'users',
      message: 'Failed to fetch users',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;