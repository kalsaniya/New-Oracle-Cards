const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const UserRouter = require('./routes/UserRoutes');
const SavedCardRouter = require('./routes/SavedCardRoutes'); // Import saved cards routes
const { notFound, errorHandler } = require("./middleware/errorHandler");
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 2000;

// CORS options to allow requests from your frontend
// const corsOptions = {
//   origin: 'http://aoecd.angelsonearthhub.com',
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization,x-login-id', 
// };
app.use(cors());
// Apply middleware
// app.use(cors(corsOptions)); // Enable CORS
app.use(express.json());
 // Parse incoming JSON requests
// app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
// app.use(express.static(path.join(__dirname, 'build'))); // Serve static files
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));



app.use('/api/User', UserRouter);
app.use('/api/savedcard', SavedCardRouter); // Add saved cards routes


app.use(notFound);
app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});








