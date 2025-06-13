const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();
const JWT_secret = 'practice';

// ROUTE 1: Create a user - POST /api/auth/createuser
router.post('/createuser', 
    [
        body('email', 'Enter a valid Email').isEmail(),
        body('name', 'Name should be at least 5 characters').isLength({ min: 5 }),
        body('password', 'Password should be at least 5 characters').isLength({ min: 5 })
    ],
    async (req, res) => {

        const errors = validationResult(req);
        console.log("errors: ", errors)
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, error: "Email already exists, enter a new one" });
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            });

            await newUser.save();
            var token = jwt.sign({ user: { id: newUser.id } }, JWT_secret);
            success = true;
            return res.status(200).json({ success, token });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json(success, { error: 'Internal Server Error' });
        }
    }
);

// ROUTE 2: Login user - POST /api/auth/login
router.post('/login', 
    [
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Enter a valid Password').isLength({ min: 5 })
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({success, errors: errors.array() });
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json({success, error: 'Incorrect credentials' });
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) {
                var token = jwt.sign({ user: { id: user.id } }, JWT_secret);
                success = true;
                return res.status(200).json({success, message: 'User authenticated successfully', token });
            } else {
                return res.status(401).json({success, error: 'Incorrect credentials' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({success, error: 'Internal Server Error' });
        }
    }
);


// ROUTE 3: Get user - POST /api/auth/getuser
router.post('/getuser', 
    fetchuser,
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error during fetching user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

module.exports = router;
