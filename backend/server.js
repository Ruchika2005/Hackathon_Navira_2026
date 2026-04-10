const express = require('express');
const dotenv  = require('dotenv');
const cors    = require('cors');
const connectDB = require('./config/db');

const authRoutes  = require('./routes/authRoutes');
const scamRoutes  = require('./routes/scamRoutes');
const sirenRoutes = require('./routes/sirenRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: '*' }));   // allow Vite dev server
app.use(express.json());

// Routes
app.use('/api/auth',  authRoutes);
app.use('/api/scam',  scamRoutes);
app.use('/api/siren', sirenRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});