const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);

/* 
        Expense
        {
            date: adfasdf,
            amount: 40,
            creator: User._id
        }

        User
        {
            details: dfldksanf,
            expenses: [{
                expense_id: expense._id
            }]
        }
*/