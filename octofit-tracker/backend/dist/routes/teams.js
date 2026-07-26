"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = require("../models/Team");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const teams = await Team_1.Team.find().populate('members', 'name email').sort({ createdAt: -1 }).lean();
        res.status(200).json({
            message: 'Teams loaded',
            count: teams.length,
            data: teams,
        });
    }
    catch (error) {
        console.error('Error loading teams:', error);
        res.status(500).json({ message: 'Failed to load teams' });
    }
});
exports.default = router;
