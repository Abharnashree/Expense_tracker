const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expenseRoutes = require('./routes/expenseRoutes');
const sequelize = require('./sequelize'); // Import Sequelize instance
require('dotenv').config();

// Create Express app
const app = express();
console.log("start");
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api', expenseRoutes);

// Connect to the database and start the server
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
        return sequelize.sync(); // Sync database models
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });






