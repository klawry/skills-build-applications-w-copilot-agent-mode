"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true,
    },
    durationMin: { type: Number, required: true, min: 1 },
    equipment: { type: [String], default: [] },
    instructions: { type: [String], default: [] },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
