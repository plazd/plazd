const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Resume = require('../../models/Resume');
const User = require('../../models/User');
const Listing = require('../../models/Listing');

// @route  GET api/status
// @desc   Get status route
// @access Private
router.get('/', auth, async (req,res) => {
    const status = [];
    const user = await User.findById(req.user.id).select('-password');
    Listing.find({}, (err,listing) => {
        if(err) throw err;
        listing.forEach(list => {
            if(list.status.length !== 0) {
                if(list.college === user.college)
                    for (i = 0; i < list.status.length; i++) {
                        console.log(list.status[i]);
                    }
            }
        })
    });
    // console.log(status);
});

module.exports = router;
