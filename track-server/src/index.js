require('./models/User');
require('./models/Track');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const requireAuth = require('./middlewares/requireAuth');

const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = `mongodb+srv://dbuser:${process.env.MONGOPASSWORD}@cluster0.stmbi.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', true);
mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
})

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
})

app.get('/', requireAuth, (req, res) => {
    res.send(`You email is ${req.user.email}`)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

