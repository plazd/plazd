const express = require('express');
const router = express.Router();

// @route  GET api/form
// @desc   Test route
// @access Public
router.get('/', (req,res) => res.send('Form Route'));

module.exports = router;