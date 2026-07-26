"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const workouts = await Workout_1.Workout.find().populate('createdBy', 'name').sort({ createdAt: -1 }).lean();
        res.status(200).json({
            message: 'Workouts loaded',
            count: workouts.length,
            data: workouts,
        });
    }
    catch (error) {
        console.error('Error loading workouts:', error);
        res.status(500).json({ message: 'Failed to load workouts' });
    }
});
exports.default = router;
