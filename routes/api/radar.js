const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Resume = require('../../models/Resume');
const User = require('../../models/User');
const Listing = require('../../models/Listing');

// @route  GET api/radar
// @desc   Radar route
// @access Private
router.get('/', auth, (req,res) => {
    const radar = [ ];
    Listing.find({}, (err,listing) => {
        if(err) throw err;
        listing.forEach(list => {
            if(list.applied.length !== 0) {
                if(list.applied.filter(applied => applied.user.toString() === req.user.id)) {
                    for (i = 0; i < list.applied.length; i++) {
                        console.log(list.applied[i]);
                    }
                }
            }
        })
    });
});

module.exports = router;
