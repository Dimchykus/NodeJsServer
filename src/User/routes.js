const passport = require('passport');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./userModel');

const JWT_SECRET = '123123';
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

router.post('/register', async (req, res) => {
  const { userName, userEmail, password } = req.body;

  if (!userName || typeof userName !== 'string') {
    return res.json({ status: 'error', error: 'Invalid user name' });
  }

  if (!password || typeof password !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password' });
  }

  if (password.length < 5) {
    return res.json({ status: 'error', error: 'Password to short. 6+' });
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const user = new User({
    name: userName,
    email: userEmail,
    password: hashedPass
  });

  try {
    const response = await user.save();
    res.json(response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: 'Username already used' });
    }
    throw error;
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.json({ message: 'error' });
    }
    if (!user) {
      return res.json({ message: 'error' });
    }
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }

      jwt.sign({ user }, JWT_SECRET, (e, token) => {
        if (e) {
          return;
        }
        res.json({ token });
      });
    });
  })(req, res, next);
});

module.exports = router;
