const router = require('express').Router();

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/users', require('./followRoutes'));
router.use('/posts', require('./postRoutes'));

module.exports = router;
