const express = require('express');
const router = express.Router();
const csvtojson = require('csvtojson');

const Product = require('../models/Product');
const User = require('../models/User');

const { verifyToken, verifyTokenandAuth, verifyTokenandAdmin } = require('./verifyToken');

//add products through csv
router.post('/upload', verifyToken, (req, res) => {

    csvtojson()
    .fromFile('./files/products.csv')
    .then((jsonObj) => {

        console.log(jsonObj);
        Product.insertMany(jsonObj, (err, data) => {

            if (err) {
                res.status(400).json("Something went wrong");
                console.log(err);
            } else {
                res.status(200).json({
                    message: "File Uploaded Successfully",
                    result: data
                });
            }
        })
    })
})


//get all users (admin)
router.get('/', verifyTokenandAdmin, async (req, res) => {

    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json(err);
    }
})

//get all products (any user)
router.get('/allproducts', verifyToken, async (req, res) => {

    try {
        const products = await Product.find();
        res.status(200).json(products);

    } catch (err) {
        res.status(500).json(err);
    }
} )

module.exports = router;