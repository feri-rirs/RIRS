const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Vkm123vkm$$$";


const UserService = require("../services/UserService");
const ExpenseService = require("../services/ExpensesService");

const authMiddleware = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access token required" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        if (user.role !== 'manager') {
            return res.status(403).json({ message: "Only manager can access this resource" });
        } else {
            next();
        }
    });
}

const authMiddlewareWithTokenInUri = async (req, res, next) => {
    const token = req.params.token;
    if (!token) return res.status(401).json({ message: "Access token required" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        if (user.role !== 'manager') {
            return res.status(403).json({ message: "Only manager can access this resource" });
        } else {
            next();
        }
    });
}
router.get('/', authMiddleware ,async (req, res) => {
    try {
        const employees = await UserService.fetchEmployeesWithExpenses();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/requests/users', authMiddleware, async (req, res) => {
    try {
        const requests = await ExpenseService.getExpenses({status: 'pending', group: { $eq: null}});
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/requests/group', authMiddleware, async (req, res) => {
    try {
        const requests = await ExpenseService.getExpenses(
            {status: 'pending', group: { $ne: null}});
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/requests/recent', authMiddleware, async (req, res) => {
    try {
        const results = await ExpenseService.getExpenses(
            {status: {$ne: 'pending'}}
        );
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/requests/recentCsv/:token/', authMiddlewareWithTokenInUri, async (req, res) => {
    try {
        const results = await ExpenseService.getExpenses(
            {status: {$ne: 'pending'}
            });
        const csv = ExpenseService.convertToCSV(results);
        res.header('Content-Type', 'text/csv');
        res.attachment('expenses.csv');
        return res.send(csv);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;