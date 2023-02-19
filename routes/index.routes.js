const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.json({ message: 'all good here' });
});

router.use('/characters', require('./characters.route'));

module.exports = router;
