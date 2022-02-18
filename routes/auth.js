const express = require('express');
const router = express.Router();

const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

//register user 
router.post ('/register', async (req, res) => {

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: CryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()
    })

    try {
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);

    } catch (err) {
        res.status(500).json(err);
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })

        if(!user) {
            res.status(404).json("Incorrect Credentials")
        }

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SEC,
        {expiresIn: process.env.JWT_EXPIRES_TIME}
        )

        const hashedPassword = CryptoJs.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        )
        const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8)

        if(originalPassword !== req.body.password) {
            res.status(404).json("Incorrect Password")
        }

        const { password, ...others } = user._doc
        res.status(200).json({...others, accessToken});

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;