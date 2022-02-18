
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const authRoute = require('./routes/auth');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//configure .env file
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' })

//connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("db connection successfull"))
    .catch((err) => { console.log(err) });

//add routes
app.use('/api/auth', authRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log('backend server is running');
})
