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
        body('name', 'Name should be atleast 5 characters').isLength({ min: 5 }),
        body('password', 'Password should be atleast 5 characters').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Check if the user already exists
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Email already exists, enter a new one" });
            }

            // Create a new user
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            });



            await newUser.save();
            var token = jwt.sign({ email : newUser.email }, JWT_secret);

            res.status(200).json({ message: 'User created successfully' , token});
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json({ error: 'Incorrect credentials' });
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) {
                var token = jwt.sign({ email : user.email }, JWT_secret);
                res.status(200).json({ message: 'User authenticated successfully' , token });
            } else {
                res.status(401).json({ error: 'Incorrect credentials' });
            }
        } catch (error) {
            
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);



// ROUTE 3: get user - POST /api/auth/getuser
router.post('/getuser', 
    fetchuser
    ,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }

        try {
            console.log(req.user)
            const user = await User.findOne({ email: req.user.email }).select('-password');
            // if (!user) {
            //     return res.status(401).json({ error: 'Incorrect credentials' });
            // }
            res.status(200).json(user);
            
        } catch (error) {
            
            //console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

module.exports = router;
