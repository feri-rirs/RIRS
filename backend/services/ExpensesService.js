const Expense = require("../schemas/expense");

class ExpenseService {
    _id;

    constructor(id) {
        this._id = id;
    }

    static async getExpenses(filter = {}) {
        return await Expense.find(filter).populate('user').populate('group').exec()
    }

    async getExpense() {
        return await Expense.findById(this._id).populate('user').populate('group').exec()
    }

    static async createExpense(expense) {
        return await new Expense(expense).save()
    }

    async updateExpense(properties) {
        return await Expense.findByIdAndUpdate(this._id, properties, { new: true }).exec()
    }

    async deleteExpense() {
        return await Expense.findByIdAndDelete(this._id).exec()
    }

    static convertToCSV(expenses) {
        const fields = ['_id', 'amount', 'description', 'status', 'user', 'group', 'createdAt', 'updatedAt'];
        let values = ''
        for (let expense of expenses) {
            let row = '';
            console.log(expense)
            row += expense._id + ',';
            row += expense.amount + ',';
            row += expense.description + ',';
            row += expense.status + ',';
            row += expense.user.name + ',';
            if (expense.group !== null) {
                row += expense.group.name + ',';
            } else {
                row += ' ' + ',';
            }
            row += expense.createdAt.toLocaleDateString('sl-SL')
                + expense.createdAt.toLocaleTimeString('sl-SL'); + ',';
            row += expense.updatedAt.toLocaleDateString('sl-SL')
                + expense.updatedAt.toLocaleTimeString('sl-SL');
            values += row + '\n';
        }
        let header = fields.join(',');
        return header + '\n' + values;
    }
}

module.exports = ExpenseService