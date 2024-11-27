const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const familyRoutes = require('./routes/familyRoutes'); // Import the family routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the family routes
app.use('/api/family', familyRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Family Expense Insights API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
