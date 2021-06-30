require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('./src/User/passport-config');
const userRoutes = require('./src/User/routes');
const professionRoutes = require('./src/Profession/routes');
const connectDB = require('./src/db');

const PORT = process.env.PORT || 5555;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport js
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveIninitialize: true
  })
);

connectDB();
app.use(express.json());
app.use(cors());
// Use API routes in the App
app.use('/', userRoutes);
app.use('/', professionRoutes);
app.listen(PORT, () => {
  console.log('Server running on PORT ', PORT);
});
