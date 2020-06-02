const express = require('express');
const router = express.Router();

// @route  GET api/radar
// @desc   Test route
// @access Public
router.get('/', (req,res) => res.send('Radar Route'));

module.exports = router;