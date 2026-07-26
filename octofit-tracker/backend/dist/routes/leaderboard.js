"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = require("../models/Leaderboard");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const entries = await Leaderboard_1.LeaderboardEntry.find()
            .populate('user', 'name')
            .populate('team', 'name city')
            .sort({ rank: 1 })
            .lean();
        res.status(200).json({
            message: 'Leaderboard loaded',
            count: entries.length,
            data: entries,
        });
    }
    catch (error) {
        console.error('Error loading leaderboard:', error);
        res.status(500).json({ message: 'Failed to load leaderboard' });
    }
});
exports.default = router;
