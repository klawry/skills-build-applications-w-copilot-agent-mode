"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const activities = await Activity_1.Activity.find()
            .populate('user', 'name email')
            .sort({ date: -1 })
            .lean();
        res.status(200).json({
            message: 'Activities loaded',
            count: activities.length,
            data: activities,
        });
    }
    catch (error) {
        console.error('Error loading activities:', error);
        res.status(500).json({ message: 'Failed to load activities' });
    }
});
exports.default = router;
