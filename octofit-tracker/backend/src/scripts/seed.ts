import mongoose from 'mongoose';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

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
      Team.deleteMany({}),
      User.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [trailblazersTeam, sprintSquadTeam] = await Team.create([
      {
        name: 'Trailblazers',
        city: 'Seattle',
        motto: 'Climb every mile',
        weeklyDistanceKm: 126,
      },
      {
        name: 'Sprint Squad',
        city: 'Austin',
        motto: 'Fast feet, strong hearts',
        weeklyDistanceKm: 98,
      },
    ]);

    const [maya, jordan, priya, liam] = await User.create([
      {
        name: 'Maya Chen',
        email: 'maya.chen@octofit.dev',
        age: 29,
        fitnessLevel: 'advanced',
        goals: ['Marathon prep', 'VO2 max improvement'],
        team: trailblazersTeam._id,
      },
      {
        name: 'Jordan Ellis',
        email: 'jordan.ellis@octofit.dev',
        age: 34,
        fitnessLevel: 'intermediate',
        goals: ['Weight loss', 'Consistency streak'],
        team: trailblazersTeam._id,
      },
      {
        name: 'Priya Nair',
        email: 'priya.nair@octofit.dev',
        age: 27,
        fitnessLevel: 'advanced',
        goals: ['5K PR', 'Core strength'],
        team: sprintSquadTeam._id,
      },
      {
        name: 'Liam Brooks',
        email: 'liam.brooks@octofit.dev',
        age: 31,
        fitnessLevel: 'beginner',
        goals: ['Complete first triathlon', 'Mobility'],
        team: sprintSquadTeam._id,
      },
    ]);

    await Promise.all([
      Team.findByIdAndUpdate(trailblazersTeam._id, { members: [maya._id, jordan._id] }),
      Team.findByIdAndUpdate(sprintSquadTeam._id, { members: [priya._id, liam._id] }),
    ]);

    await Activity.create([
      {
        user: maya._id,
        type: 'run',
        durationMin: 52,
        distanceKm: 10.4,
        calories: 630,
        date: new Date('2026-07-22T06:30:00.000Z'),
      },
      {
        user: jordan._id,
        type: 'strength',
        durationMin: 45,
        calories: 410,
        date: new Date('2026-07-22T18:10:00.000Z'),
      },
      {
        user: priya._id,
        type: 'cycle',
        durationMin: 70,
        distanceKm: 28.2,
        calories: 780,
        date: new Date('2026-07-23T07:00:00.000Z'),
      },
      {
        user: liam._id,
        type: 'swim',
        durationMin: 38,
        distanceKm: 1.5,
        calories: 360,
        date: new Date('2026-07-23T17:30:00.000Z'),
      },
      {
        user: maya._id,
        type: 'yoga',
        durationMin: 30,
        calories: 150,
        date: new Date('2026-07-24T20:00:00.000Z'),
      },
    ]);

    await LeaderboardEntry.create([
      { user: maya._id, team: trailblazersTeam._id, points: 1280, rank: 1, period: '2026-W30' },
      { user: priya._id, team: sprintSquadTeam._id, points: 1150, rank: 2, period: '2026-W30' },
      { user: jordan._id, team: trailblazersTeam._id, points: 930, rank: 3, period: '2026-W30' },
      { user: liam._id, team: sprintSquadTeam._id, points: 760, rank: 4, period: '2026-W30' },
    ]);

    await Workout.create([
      {
        title: 'Tempo Run Builder',
        focus: 'Endurance',
        difficulty: 'advanced',
        durationMin: 60,
        equipment: ['Running shoes', 'GPS watch'],
        instructions: ['10-min easy warmup', '4 x 8-min tempo with 2-min easy jog', '10-min cooldown'],
        createdBy: maya._id,
      },
      {
        title: 'Beginner Full-Body Circuit',
        focus: 'Strength',
        difficulty: 'beginner',
        durationMin: 35,
        equipment: ['Dumbbells', 'Exercise mat'],
        instructions: ['3 rounds: squats, rows, pushups', 'Rest 60 seconds between rounds', 'Finish with 5-min stretch'],
        createdBy: jordan._id,
      },
      {
        title: 'Cycling Power Ladder',
        focus: 'Cardio',
        difficulty: 'intermediate',
        durationMin: 50,
        equipment: ['Bike trainer'],
        instructions: ['10-min warmup', '5-min progressive intervals x 4', '8-min cooldown'],
        createdBy: priya._id,
      },
    ]);

    const [usersCount, teamsCount, activitiesCount, leaderboardCount, workoutsCount] = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      LeaderboardEntry.countDocuments(),
      Workout.countDocuments(),
    ]);

    console.log('Seed summary:', {
      users: usersCount,
      teams: teamsCount,
      activities: activitiesCount,
      leaderboardEntries: leaderboardCount,
      workouts: workoutsCount,
    });

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
