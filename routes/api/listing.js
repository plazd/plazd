const express = require('express');
const router = express.Router();
const auth =require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Resume = require('../../models/Resume');
const User = require('../../models/User');
const Listing = require('../../models/Listing');

// Required Put for listing lastDateApply


// @route  POST api/listing
// @desc   Create a listing
// @access Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty(),
    check('lastDateApply', 'lastDateApply is required').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {   
        return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select('-password');
    if(user.role === false) {
        return res.status(401).json({ msg: 'User not Authorized' });
    }
    try {
        const newListing =new Listing ({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            college: user.college,
            user: req.user.id,
            lastDateApply: req.body.lastDateApply
        });

        newListing.status = {
            user: req.user.id,
            avatar: user.avatar,            
            text: "New Post Added : " + req.body.text            
        };        
        const listing = await newListing.save();

        res.json(listing);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
    
});

// @route  GET api/listing
// @desc   Get all listing
// @access Private
router.get('/', auth, async(req,res) => {
    try {

        // Get listing according to batch and Branch
        // Add college condition to find()
        const listings = await Listing.find().sort({ date: -1});
        res.json(listings);

        // const userCollege = await User.findById(req.user.id);
        // const listings = await Listing.find({college: userCollege.college}).sort({ date: -1});
        // res.json(listings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/listing/:id
// @desc   Get all listing
// @access Private
router.get('/:id', auth, async(req,res) => {
    try {
        // Get listing according to batch
        // Add college condition to find()
        const listing = await Listing.findById(req.params.id);
        if(!listing) {
            return res.status(404).json({ msg: 'Listing not found'});
        }
        res.json(listing);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Listing not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/listing/:id
// @desc   Delete listing by id
// @access Private
router.delete('/:id', auth, async (req,res) => {
    try {

        const listing = await Listing.findById(req.params.id);
        // Check User
        if(!listing) {
            return res.status(404).json({ msg: 'Listing not found'});
        }
        if(listing.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not Authorized'});
        }
        await listing.remove();
        res.json({msg: 'Listing Removed'});
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Listing not found'});
        }
        return res.status(500).send('Server Error');
    }
});
  
  // @route  PUT api/listing/apply/:id
  // @desc   Applying for listing
  // @access Private
  router.put('/apply/:id', auth, async (req,res) => {
    try {
        const listing = await Listing.findById(req.params.id);
  
        if(listing.applied.filter(applied => applied.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg: 'Listing already applied'});
        }
        var d = new Date();
        if(d > listing.lastDateApply) {
            return res.status(400).json({msg: 'Time for Appling Passed'});
        }

        const resume = await Resume.findOne({user: req.user.id});
        if(resume.open === false) {
            return res.status(400).json({msg: 'You are not open for applying'});
        }

        const userApp = await User.findById(req.user.id);
        if(userApp.complete === false) {
            return res.status(400).json({msg: 'Complete Your Resume'});
        }
        if(userApp.college !== listing.college) {
            return res.status(400).json({msg: 'NOt your college resume'});
        }

        listing.applied.unshift({ user : req.user.id, name: userApp.name, avatar: userApp.avatar});
        await listing.save();
        res.json(listing.applied);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

  // @route  PUT api/listing/unapply/:id
  // @desc   Unapplying for listing
  // @access Private
  router.put('/unapply/:id', auth, async (req,res) => {
    try {
        const listing = await Listing.findById(req.params.id);
  
        if(listing.applied.filter(applied => applied.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({msg: 'Listing not applied'});
        }
        var d = new Date();
        if(d > listing.lastDateApply) {
            return res.status(400).json({msg: 'Time for Unappling Passed'});
        }
        const userApp = await User.findById(req.user.id);
        
        const removeIndex = listing.applied.map(applied => applied.user.toString()).indexOf(req.user.id);
        listing.applied.splice(removeIndex, 1);
        await listing.save();
        res.json(listing.applied);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route  POST api/listing/status/:id
// @desc   Create a status for listing
// @access Private
router.post('/status/:id', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {   
        return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select('-password');
    if(user.role === false) {
        return res.status(400).json({ msg: 'You are not admin' });
    }
    console.log(user);
    const listing = await Listing.findById(req.params.id);
    if(user.college !== listing.college) {
        return res.status(400).json({ msg: 'Listing is for other college' });
    }
    try {
        const newStatus = {
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
            text: req.body.text            
        };

        listing.status.unshift(newStatus);
        await listing.save();

        res.json(listing.status);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
    
});

// @route  Delete api/listing/status/:id/:status_id
// @desc   Delete status for listing
// @access Private
router.delete('/status/:id/:status_id', auth, async (req, res) => {
    try {
      const listing = await Listing.findById(req.params.id);
  
      const status = listing.status.find(
        (status) => status.id === req.params.status_id
      );
      if (!status) {
        return res.status(404).json({ msg: 'Status does not exist' });
      }
      if (status.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      listing.status = listing.status.filter(
        ({ id }) => id !== req.params.status_id
      );
  
      await listing.save();
  
      return res.json(listing.status);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  });

module.exports = router;