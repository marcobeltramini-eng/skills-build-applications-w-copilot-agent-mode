import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Alex Kim',
        email: 'alex@example.com',
        passwordHash: 'hash_alex_123',
        profile: { age: 28, level: 'intermediate', goals: ['fat loss', 'endurance'] },
      },
      {
        name: 'Priya Singh',
        email: 'priya@example.com',
        passwordHash: 'hash_priya_123',
        profile: { age: 33, level: 'advanced', goals: ['strength'] },
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Cardio Crushers',
        description: 'Focused on endurance and HIIT sessions.',
        members: users.map((user) => user._id),
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 35,
        calories: 410,
        timestamp: new Date(),
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 45,
        calories: 520,
        timestamp: new Date(),
      },
    ]);

    await Leaderboard.create({
      scope: 'global',
      entries: [
        { user: users[1]._id, teamName: teams[0].name, score: 1290, rank: 1 },
        { user: users[0]._id, teamName: teams[0].name, score: 1170, rank: 2 },
      ],
    });

    await Workout.insertMany([
      {
        name: 'Morning HIIT Blast',
        description: '20-minute full-body HIIT routine.',
        difficulty: 'intermediate',
        durationMinutes: 20,
        tags: ['hiit', 'full-body'],
      },
      {
        name: 'Core Strength Builder',
        description: 'Focused core workout for stability and strength.',
        difficulty: 'advanced',
        durationMinutes: 25,
        tags: ['core', 'strength'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
  }
}

seedDatabase();
