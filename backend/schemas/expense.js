const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' } 
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
