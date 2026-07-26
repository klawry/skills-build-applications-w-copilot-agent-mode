import express from 'express';
import './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const port = 8000;

function getApiUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}


app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', apiBaseUrl: getApiUrl() });
});

app.get('/api/config', (_req, res) => {
  res.status(200).json({ apiBaseUrl: getApiUrl() });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.listen(port, () => {
  console.log(`Octofit backend listening on port ${port}`);
});
