var express = require('express');

const router = express.Router();

router.get('/health-check', function(req, res){
	res.send('OK');
});

module.exports = router;