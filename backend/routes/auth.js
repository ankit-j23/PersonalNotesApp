const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = 'ankitisagoodpr0gramme1r';

// creating a user using POST "./api/auth/createUser" No login required
router.post('/createUser', [
    body('name', 'Please enter a valid name').isLength({ min: 3 }),
    body('email', 'Please enter a valid email address').isEmail(),
    body('password', 'Your password shoud be atleast 5 charachers long').isLength({ min: 5 })
], async (req, res) => {
    let success = false;

    // if there is an error then returning a bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // const user = User(req.body);
    // user.save();

    // checking if any user with the same email exists or not if yes then return a bad request 
    try {

        let user = await User.findOne({email: req.body.email })
        if (user) {
            return res.status(400).json({success , error: "Sorry , a user with this email already exists" })
        }

        // generating hash for the passwords
        const salt = bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        // console.log(user);

        // .then(user=>res.json(user))
        // .catch(err=>{console.log(err)
        //     res.json({error : 'please enter a unique email address', message : err.message})
        // })

        //creating token (and authtoken) for every user

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)


        res.json({success:true, authToken });
    } catch (error) {
        // console.log(error.message);
        res.status(500).send( success , "Some Error Occured")
    }
})

// Authenticating a user using POST "./api/auth/login" No login required
router.post('/userlogin', [
    body('email', 'Please enter a valid email address').isEmail(),
    body('password', 'password can not be blank').exists()
], async (req, res) => {
    let success = false;
    // if there is an error then returning a bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with valid credentials" })
        }

        const passwordComp = await bcrypt.compare(password, user.password);
        if (!passwordComp) {
            return res.status(400).json({success, error: "Please try to login with valid credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({success:true, authToken });

    } catch (error) {
        // console.log(error.message)
        res.status(500).send("Internal server Error")
    }
})
// Getting user details using POST "./api/auth/getuser"
router.post('/getuser', fetchUser , async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        // console.log(error.message)
        res.status(500).send("Internal server Error")
    }
})
module.exports = router