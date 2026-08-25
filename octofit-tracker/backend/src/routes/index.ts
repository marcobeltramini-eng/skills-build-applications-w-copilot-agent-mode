import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const router = Router();
const readLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(readLimiter);

router.get('/', (_req, res) => {
  res.json({ message: 'Octofit API is running' });
});

router.get('/users/', async (_req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash').lean();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/teams/', async (_req, res, next) => {
  try {
    const teams = await Team.find().populate('members', 'name email').lean();
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

router.get('/activities/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().populate('user', 'name').lean();
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard/', async (_req, res, next) => {
  try {
    const leaderboard = await Leaderboard.find().lean();
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

router.get('/workouts/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().lean();
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

export default router;
