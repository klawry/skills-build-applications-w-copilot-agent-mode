"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const baseUrl_1 = require("./config/baseUrl");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', apiBaseUrl: (0, baseUrl_1.getApiBaseUrl)() });
});
app.get('/api/config', (_req, res) => {
    res.status(200).json({ apiBaseUrl: (0, baseUrl_1.getApiBaseUrl)() });
});
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.listen(port, () => {
    console.log(`Octofit backend listening on port ${port}`);
});
