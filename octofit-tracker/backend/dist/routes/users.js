"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const users = await User_1.User.find().sort({ createdAt: -1 }).lean();
        res.status(200).json({
            message: 'Users loaded',
            count: users.length,
            data: users,
        });
    }
    catch (error) {
        console.error('Error loading users:', error);
        res.status(500).json({ message: 'Failed to load users' });
    }
});
exports.default = router;
