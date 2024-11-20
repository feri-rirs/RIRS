const express = require('express');
const { port } = require('./config/index');
const { connectToDatabase } = require('./db/index');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const groupRouter = require('./routes/groupRouter');
const expenseRouter = require('./routes/expenseRouter');
const managerRouter = require('./routes/managerRouter');
app.use(
  cors({
    // origin: 'http://localhost:3000', // specify your frontend's address
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

const defineRoutes = () => {
  app.use('/api/users', userRouter);
  app.use('/api/groups', groupRouter);
  app.use('/api/expenses', expenseRouter);
  app.use('/api/manager', managerRouter);
};

const initServer = async () => {
  app.use(bodyParser.json());
  defineRoutes();

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectToDatabase();
  });
};

initServer();
