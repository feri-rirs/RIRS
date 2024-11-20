const mongoose = require('mongoose');
const { dbUrl } = require('./config');
const User = require('./schemas/user');
const Expense = require('./schemas/expense');
const Group = require('./schemas/group');

// SAMO TEST DALI SE POLNE MONGODB!!!


mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));

    async function seedDatabase() {
        try {
            const user1 = await User.create({ 
                name: 'John Doe', 
                email: 'john@example.com', 
                password: 'securepassword', 
                role: 'ordinary',
                budget: { total: 1000, utilized: 200 } 
            });
    
            const user2 = await User.create({ 
                name: 'Jane Smith', 
                email: 'jane@example.com', 
                password: 'securepassword', 
                role: 'manager',
                budget: { total: 5000, utilized: 800 }
            });
    
            const group1 = await Group.create({ 
                name: 'Sales Team', 
                members: [user1._id, user2._id], 
                budget: { total: 15000, utilized: 500 }
            });
    
            const expense1 = await Expense.create({ 
                user: user1._id, 
                description: 'Flight to NY', 
                amount: 300, 
                date: new Date(), 
                status: 'approved', 
                type: 'travel', 
                group: group1._id 
            });
    
            const expense2 = await Expense.create({ 
                user: user1._id, 
                description: 'Lunch with Client', 
                amount: 50, 
                date: new Date(), 
                status: 'approved', 
                type: 'meal', 
                group: group1._id 
            });
    
            console.log('Sample data inserted successfully');
        } catch (err) {
            console.error('Error inserting sample data:', err);
        } finally {
            mongoose.connection.close();
        }
    }
    
    seedDatabase();