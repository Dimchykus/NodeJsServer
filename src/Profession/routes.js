const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Profession = require('./professionModel');

const JWT_SECRET = '123123';

// router.post('/profession', async (req, res) => {
//   const { name } = req.body;
//   try {
//     if (name) {
//       const profession = new Profession({
//         name
//       });
//       const response = await profession.save();
//       return res.json(response);
//     }
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.json({ status: 'error', error: 'Profession already used' });
//     }
//     throw error;
//   }
//   return res.json({ status: 'error', error: 'Invalid data' });
// });

router.post('/profession', async (req, res) => {
  const { token } = req.body;
  try {
    if (token) {
      jwt.verify(token, JWT_SECRET);
      const profession = await Profession.find();
      return res.json(profession);
    }
  } catch (error) {
    console.log(error);
  }
  return res.json({ status: 'error', error: 'Invalid data' });
});

module.exports = router;
