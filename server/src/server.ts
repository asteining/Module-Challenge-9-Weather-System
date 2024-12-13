import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;


// Middleware
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.json());

// Use the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
