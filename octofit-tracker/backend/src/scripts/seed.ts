import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [trailTitans, metroMovers] = await Team.insertMany([
      {
        name: 'Trail Titans',
        city: 'Denver',
        motto: 'Every summit starts with one step',
      },
      {
        name: 'Metro Movers',
        city: 'Chicago',
        motto: 'Strong habits, stronger team',
      },
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@octofit.app',
        age: 29,
        fitnessLevel: 'intermediate',
        team: trailTitans._id,
        goals: ['Run a 10K under 55 minutes', 'Improve weekly consistency'],
        weeklyTarget: 5,
      },
      {
        name: 'Noah Ramirez',
        email: 'noah.ramirez@octofit.app',
        age: 34,
        fitnessLevel: 'advanced',
        team: trailTitans._id,
        goals: ['Increase VO2 max', 'Maintain 4 strength sessions/week'],
        weeklyTarget: 6,
      },
      {
        name: 'Mia Chen',
        email: 'mia.chen@octofit.app',
        age: 26,
        fitnessLevel: 'beginner',
        team: metroMovers._id,
        goals: ['Build core strength', 'Complete first 5K'],
        weeklyTarget: 4,
      },
      {
        name: 'Ethan Brooks',
        email: 'ethan.brooks@octofit.app',
        age: 31,
        fitnessLevel: 'intermediate',
        team: metroMovers._id,
        goals: ['Lower resting heart rate', 'Improve mobility'],
        weeklyTarget: 5,
      },
    ]);

    const userByName = Object.fromEntries(users.map((user) => [user.name, user]));

    trailTitans.members = [userByName['Ava Thompson']._id, userByName['Noah Ramirez']._id];
    trailTitans.captain = userByName['Noah Ramirez']._id;

    metroMovers.members = [userByName['Mia Chen']._id, userByName['Ethan Brooks']._id];
    metroMovers.captain = userByName['Ethan Brooks']._id;

    
    await trailTitans.save();
    await metroMovers.save();

    const activities = await Activity.insertMany([
      {
        user: userByName['Ava Thompson']._id,
        team: trailTitans._id,
        type: 'run',
        durationMinutes: 48,
        distanceKm: 8.1,
        caloriesBurned: 510,
        performedAt: new Date('2026-08-20T07:15:00.000Z'),
        notes: 'Tempo run with negative split',
      },
      {
        user: userByName['Noah Ramirez']._id,
        team: trailTitans._id,
        type: 'strength',
        durationMinutes: 62,
        caloriesBurned: 460,
        performedAt: new Date('2026-08-21T18:10:00.000Z'),
        notes: 'Lower body strength block',
      },
      {
        user: userByName['Noah Ramirez']._id,
        team: trailTitans._id,
        type: 'cycling',
        durationMinutes: 55,
        distanceKm: 21.4,
        caloriesBurned: 620,
        performedAt: new Date('2026-08-23T06:40:00.000Z'),
        notes: 'Intervals on rolling hills',
      },
      {
        user: userByName['Mia Chen']._id,
        team: metroMovers._id,
        type: 'yoga',
        durationMinutes: 35,
        caloriesBurned: 180,
        performedAt: new Date('2026-08-22T19:00:00.000Z'),
        notes: 'Recovery-focused vinyasa session',
      },
      {
        user: userByName['Mia Chen']._id,
        team: metroMovers._id,
        type: 'hiit',
        durationMinutes: 28,
        caloriesBurned: 310,
        performedAt: new Date('2026-08-24T17:30:00.000Z'),
        notes: 'Bodyweight circuit with core finisher',
      },
      {
        user: userByName['Ethan Brooks']._id,
        team: metroMovers._id,
        type: 'swim',
        durationMinutes: 50,
        distanceKm: 1.8,
        caloriesBurned: 430,
        performedAt: new Date('2026-08-23T12:20:00.000Z'),
        notes: 'Mixed pace endurance set',
      },
    ]);

    const workouts = await Workout.insertMany([
      {
        title: 'Beginner Core Builder',
        focus: 'core stability',
        level: 'beginner',
        durationMinutes: 25,
        equipment: ['yoga mat'],
        instructions: ['3 rounds: plank 30s', 'Dead bug 12 reps per side', 'Glute bridge 15 reps'],
      },
      {
        title: 'Endurance Run Progression',
        focus: 'running endurance',
        level: 'intermediate',
        durationMinutes: 50,
        equipment: ['running shoes', 'watch'],
        instructions: ['10 min easy warmup', '30 min steady run', '10 min cooldown walk/jog'],
      },
      {
        title: 'Power Strength Ladder',
        focus: 'full-body power',
        level: 'advanced',
        durationMinutes: 60,
        equipment: ['barbell', 'kettlebell', 'bench'],
        instructions: ['Back squat ladder 5-4-3-2-1', 'Kettlebell swings 5x20', 'Push press 4x6'],
      },
    ]);

    const userPoints = new Map<string, number>();
    for (const activity of activities) {
      const score = Math.round(activity.durationMinutes + activity.caloriesBurned / 10);
      const key = String(activity.user);
      userPoints.set(key, (userPoints.get(key) || 0) + score);
    }

    const sortedUsers = [...users].sort((a, b) => (userPoints.get(String(b._id)) || 0) - (userPoints.get(String(a._id)) || 0));

    const leaderboardEntries = sortedUsers.map((user, index) => ({
      user: user._id,
      team: user.team,
      points: userPoints.get(String(user._id)) || 0,
      rank: index + 1,
    }));

    await Leaderboard.create({
      scope: 'global',
      weeklyStart: new Date('2026-08-17T00:00:00.000Z'),
      entries: leaderboardEntries,
    });

    const teamPoints = new Map<string, number>();
    for (const entry of leaderboardEntries) {
      const teamKey = String(entry.team);
      teamPoints.set(teamKey, (teamPoints.get(teamKey) || 0) + entry.points);
    }

    trailTitans.totalPoints = teamPoints.get(String(trailTitans._id)) || 0;
    metroMovers.totalPoints = teamPoints.get(String(metroMovers._id)) || 0;
    await trailTitans.save();
    await metroMovers.save();

    console.log(`Seeded ${users.length} users`);
    console.log(`Seeded 2 teams`);
    console.log(`Seeded ${activities.length} activities`);
    console.log(`Seeded ${workouts.length} workouts`);
    console.log('Seeded 1 leaderboard');

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
