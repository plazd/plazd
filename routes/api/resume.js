// Profile
const express = require('express');
const router = express.Router();
const auth =require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Resume = require('../../models/Resume');
const User = require('../../models/User');
const normalize = require('normalize-url');

// @route  GET api/resume/me
// @desc   Get Resume
// @access Private
router.get('/me', auth, async (req,res) => {
    try{
        const resume = await Resume.findOne({ user: req.user.id }).populate('user', ['name', 'avatar', 'college']);

        if(!resume){
            return res.status(400).json({ msg: 'There is no resume exists for this user' });
        }
        res.json(resume);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/resume/profile
// @desc   Edit Resume's Profile
// @access Private
router.post('/profile', [auth, [
    check('rollno', 'rollno is required').not().isEmpty(),
    check('batch', 'batch is required').not().isEmpty(),
    check('branch', 'branch is required').not().isEmpty(),
    check('phone', 'phone is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {   
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        rollno,
        batch,
        branch,
        dob,
        phone,
        location,
        altemail,
        skills,
        courses,
        bio,
        linkedin, 
        github
      } = req.body;

      const resumeFields = {
        rollno,
        user: req.user.id,
        batch,
        branch,
        // website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
        dob,
        phone,
        location,
        altemail,
        skills: Array.isArray(skills)
          ? skills
          : skills.split(',').map((skill) => ' ' + skill.trim()),
        courses,
        bio
      };

      resumeFields.social = {};
      if(linkedin) resumeFields.social.linkedin =linkedin;
      if(github) resumeFields.social.github = github;
      
      try {
        // Using upsert option (creates new doc if no match is found):
        let resume = await Resume.findOneAndUpdate(
          { user: req.user.id },
          { $set: resumeFields },
          { new: true, upsert: true }
        );
        res.json(resume);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }

      console.log(resumeFields.skills);
      res.send('Hello');

});

// @route    GET api/resume
// @desc     Get all resume
// @access   Public
router.get('/', async (req, res) => {
    try {
      const resume = await Resume.find().populate('user', ['name', 'avatar', 'college']);
      res.json(resume);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/resume/user/:user_id
// @desc     Get resume by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
      try {
        const resume = await Resume.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar', 'college']);
        if (!resume) {
            return res.status(400).json({ msg: 'Resume not found' });
        }
        return res.json(resume);
      } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Resume not found' });
        }

        return res.status(500).json({ msg: 'Server error' });
      }
    }
  );

// @route    DELETE api/resume
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    await Resume.findOneAndRemove({user: req.user.id});
    await User.findOneAndRemove({_id: req.user.id});
    res.json({msg : "User Removed"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/resume/exp
// @desc     Add resume experience
// @access   Private
router.put('/exp', [auth,[
  check('position', 'Position is required').not().isEmpty(),
  check('title', 'title is required').not().isEmpty(),
  check('organization', 'organization is required').not().isEmpty(),
  check('description', 'description is required').not().isEmpty(),
  check('from', 'From Date is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()});
  }

  const {
    title,
    position,
    organization,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  const newExp = {
    title,
    position,
    organization,
    location,
    from,
    to,
    current,
    description
  };
  
  try {
    const resume = await Resume.findOne({user: req.user.id});

    resume.experience.unshift(newExp);

    await resume.save();

    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/resume/exp/:exp_id
// @desc     Delete Experience by id
// @access   Private
router.delete('/exp/:exp_id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({user: req.user.id});

    const removeIndex = resume.experience.map(item => item.id).indexOf(req.params.exp_id);
    resume.experience.splice(removeIndex, 1);
    await resume.save();
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/resume/edu
// @desc     Add resume education
// @access   Private
router.put('/edu', [auth,[
  check('school', 'Position is required').not().isEmpty(),
  check('degree', 'title is required').not().isEmpty(),
  check('fieldofstudy', 'organization is required').not().isEmpty(),
  check('from', 'From Date is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()});
  }

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };
  
  try {
    const resume = await Resume.findOne({user: req.user.id});

    resume.education.unshift(newEdu);

    await resume.save();

    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/resume/edu/:edu_id
// @desc     Delete Education by id
// @access   Private
router.delete('/edu/:edu_id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({user: req.user.id});

    const removeIndex = resume.education.map(item => item.id).indexOf(req.params.exp_id);
    resume.education.splice(removeIndex, 1);
    await resume.save();
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/resume/proj
// @desc     Add resume Project
// @access   Private
router.put('/proj', [auth,[
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'description is required').not().isEmpty(),
  check('from', 'From Date is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()});
  }

  const {
    title,
    professor,
    underprof,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  const newProj = {
    title,
    professor,
    underprof,
    location,
    from,
    to,
    current,
    description
  };
  
  try {
    const resume = await Resume.findOne({user: req.user.id});

    resume.project.unshift(newProj);

    await resume.save();

    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/resume/proj/:proj_id
// @desc     Delete Project by id
// @access   Private
router.delete('/proj/:proj_id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({user: req.user.id});

    const removeIndex = resume.project.map(item => item.id).indexOf(req.params.exp_id);
    resume.project.splice(removeIndex, 1);
    await resume.save();
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/resume/ach
// @desc     Add resume Achievement
// @access   Private
router.put('/ach', [auth,[
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'description is required').not().isEmpty(),
  check('from', 'From Date is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()});
  }

  const {
    title,
    from,
    to,
    current,
    description
  } = req.body;

  const newAch = {
    title,
    from,
    to,
    current,
    description
  };
  
  try {
    const resume = await Resume.findOne({user: req.user.id});

    resume.achievement.unshift(newAch);

    await resume.save();

    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/resume/proj/:proj_id
// @desc     Delete Achievemnt by id
// @access   Private
router.delete('/ach/:ach_id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({user: req.user.id});

    const removeIndex = resume.achievement.map(item => item.id).indexOf(req.params.exp_id);
    resume.achievement.splice(removeIndex, 1);
    await resume.save();
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;