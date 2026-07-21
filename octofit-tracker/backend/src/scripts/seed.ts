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

    // Clear existing collections for idempotent seeding
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ariana Diaz', email: 'ariana.diaz@octofit.com', age: 27 },
      { name: 'Marcus Chen', email: 'marcus.chen@octofit.com', age: 31 },
      { name: 'Priya Nair', email: 'priya.nair@octofit.com', age: 24 },
      { name: 'Jordan Lee', email: 'jordan.lee@octofit.com', age: 29 },
      { name: 'Sofia Rossi', email: 'sofia.rossi@octofit.com', age: 22 },
      { name: 'Tunde Adeyemi', email: 'tunde.adeyemi@octofit.com', age: 34 },
    ]);

    const [ariana, marcus, priya, jordan, sofia, tunde] = users;

    const teams = await Team.insertMany([
      { name: 'Octopus Sprinters', members: [ariana._id, marcus._id] },
      { name: 'Tentacle Titans', members: [priya._id, jordan._id] },
      { name: 'Reef Runners', members: [sofia._id, tunde._id] },
    ]);

    await Promise.all([
      User.findByIdAndUpdate(ariana._id, { team: teams[0]._id }),
      User.findByIdAndUpdate(marcus._id, { team: teams[0]._id }),
      User.findByIdAndUpdate(priya._id, { team: teams[1]._id }),
      User.findByIdAndUpdate(jordan._id, { team: teams[1]._id }),
      User.findByIdAndUpdate(sofia._id, { team: teams[2]._id }),
      User.findByIdAndUpdate(tunde._id, { team: teams[2]._id }),
    ]);

    await Activity.insertMany([
      { user: ariana._id, type: 'Running', durationMinutes: 30, caloriesBurned: 300, date: new Date('2026-07-14') },
      { user: marcus._id, type: 'Cycling', durationMinutes: 45, caloriesBurned: 400, date: new Date('2026-07-15') },
      { user: priya._id, type: 'Swimming', durationMinutes: 60, caloriesBurned: 500, date: new Date('2026-07-16') },
      { user: jordan._id, type: 'Yoga', durationMinutes: 40, caloriesBurned: 150, date: new Date('2026-07-17') },
      { user: sofia._id, type: 'Weightlifting', durationMinutes: 50, caloriesBurned: 350, date: new Date('2026-07-18') },
      { user: tunde._id, type: 'Running', durationMinutes: 25, caloriesBurned: 260, date: new Date('2026-07-19') },
      { user: ariana._id, type: 'HIIT', durationMinutes: 20, caloriesBurned: 280, date: new Date('2026-07-20') },
    ]);

    await Leaderboard.insertMany([
      { user: ariana._id, points: 950, rank: 1 },
      { user: priya._id, points: 870, rank: 2 },
      { user: marcus._id, points: 820, rank: 3 },
      { user: sofia._id, points: 760, rank: 4 },
      { user: tunde._id, points: 690, rank: 5 },
      { user: jordan._id, points: 640, rank: 6 },
    ]);

    await Workout.insertMany([
      {
        name: 'Couch to 5K Kickoff',
        description: 'A beginner-friendly interval run/walk plan to build running endurance.',
        difficulty: 'beginner',
        durationMinutes: 30,
        suggestedFor: ['Running', 'HIIT'],
      },
      {
        name: 'Full-Body Strength Circuit',
        description: 'Compound lifts and bodyweight moves targeting all major muscle groups.',
        difficulty: 'intermediate',
        durationMinutes: 45,
        suggestedFor: ['Weightlifting'],
      },
      {
        name: 'Sunrise Vinyasa Flow',
        description: 'A gentle yoga flow to improve flexibility and reduce stress.',
        difficulty: 'beginner',
        durationMinutes: 40,
        suggestedFor: ['Yoga'],
      },
      {
        name: 'Open Water Endurance Swim',
        description: 'Distance swimming intervals for building cardiovascular endurance.',
        difficulty: 'advanced',
        durationMinutes: 60,
        suggestedFor: ['Swimming'],
      },
      {
        name: 'Hill Climb Cycling Challenge',
        description: 'A cycling workout focused on hill repeats and power output.',
        difficulty: 'advanced',
        durationMinutes: 50,
        suggestedFor: ['Cycling'],
      },
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, and sample activities, leaderboard entries, and workouts.`);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
