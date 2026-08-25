import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const router = Router();

router.get('/users/', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

router.get('/teams/', async (_req, res) => {
  const teams = await Team.find().populate('members', 'name email').lean();
  res.json(teams);
});

router.get('/activities/', async (_req, res) => {
  const activities = await Activity.find().populate('user', 'name').lean();
  res.json(activities);
});

router.get('/leaderboard/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().lean();
  res.json(leaderboard);
});

router.get('/workouts/', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

export default router;
