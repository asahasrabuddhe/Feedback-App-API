var express = require('express');
var authRoutes = require('./auth.route');
var userRoutes = require('./user.route');

const router = express.Router();

router.get('/health-check', function(req, res){
	res.json('OK');
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;