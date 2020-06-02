const express = require('express');
const router = express.Router();

// @route  GET api/Listing
// @desc   Test route
// @access Public
router.get('/', (req,res) => res.send('Listing Route'));

module.exports = router;