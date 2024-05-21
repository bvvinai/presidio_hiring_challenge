const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const Item = require('./models/Item.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'kjergboerygbofdborgobjvhodfhbv';
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost', 'http://presidio.ap-south-1.elasticbeanstalk.com'],
}));

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'venkata.vinai@gmail.com',
        pass: 'gvkp dvqp lhbw nsni'
    }
});

mongoose.connect("mongodb+srv://bvvinai:bvvinai%401357@cluster0.nhpk5tu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.post('/api/register', async (req, res) => {
    const { email, password, firstname, lastname, phno } = req.body;
    try {
        const userDoc = await User.create({
            firstname,
            lastname,
            phno,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json({ "status": true, "data": "Registered Successfully!" });
    } catch (e) {
        res.json({ "status": false, "data": e.errmsg || e._message });
    }

});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc != null && userDoc != false) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            userDoc.password = "hashed";
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({ "status": true, "data": userDoc });
            });
        } else {
            res.json({ "status": false, "data": "Incorrect Password!" });
        }
    } else {
        res.json({ "status": false, "data": "User not found!" });
    }
});

app.get('/api/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const userDoc = await User.findById(userData.id);
            userDoc.password = "hashed";
            res.json(userDoc);
        });
    } else {
        res.json(null);
    }
});

app.post('/api/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.get('/api/getallitems/:id', async (req, res) => {
    var id = req.params.id;
    try {
        const docs = await Item.find({}, { owner: 0 }).sort({ createdAt: 'desc' }).skip((id - 1) * 20).limit(20);
        res.json({ "status": true, "data": docs });
    } catch (e) {
        res.json({ "status": false, "data": "Unknown Error" });
    }
});

app.post('/api/search', async (req, res) => {
    const { bedrooms, bathrooms, text } = req.body;
    try {
        const query = {
            $or: [
                { title: { $regex: RegExp(text, 'i') } },
                { place: { $regex: RegExp(text, 'i') } },
                { area: { $regex: RegExp(text, 'i') } },
            ]
        };
        if (bedrooms) {
            query.bedrooms = bedrooms;
        }
        if (bathrooms) {
            query.bathrooms = bathrooms;
        }
        const docs = await Item.find(query).sort({ updatedAt: 'desc' });
        res.json({ "status": true, "data": docs });
    } catch (e) {
        console.log(e)
        res.json({ "status": false, "data": e.errmsg || e._message });
    }
});

app.get('/api/getmyitems', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const docs = await Item.find({ 'owner': userData.email }).sort({ updatedAt: 'desc' });
            res.json({ "status": true, "data": docs });
        });
    } else {
        res.json({ "status": false, "data": "Unauthorized User! Login first." });
    }
});

app.get('/api/getitembyid/:id', async (req, res) => {
    var _id = req.params.id;
    try {
        const itemDoc = await Item.findOne({ _id });
        res.json({ "status": true, "data": itemDoc });
    } catch (e) {
        res.json({ "status": false, "data": e.message });
    }
});

app.get('/api/getsellerbyid/:id', async (req, res) => {
    var _id = req.params.id;
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            try {
                const itemDoc = await Item.findOne({ _id });
                const userDocBuyer = await User.findOne({ email: userData.email }, { password: 0 });
                const userDoc = await User.findOne({ email: itemDoc.owner }, { password: 0 });
                transporter.sendMail({
                    from: 'venkat.vinai@gmail.com',
                    to: userData.email,
                    subject: 'Interested Property Seller',
                    html: `<p>Name: ${userDoc.firstname} ${userDoc.lastname}</p><p>Email: ${userDoc.email}</p><p>Phone Number: ${userDoc.phno}</p><p>Property: ${itemDoc.title}</p>`,
                },
                    function (error, info) {
                        if (error) {
                            console.log(error.code);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                transporter.sendMail({
                    from: 'venkat.vinai@gmail.com',
                    to: userDoc.email,
                    subject: 'Interested Property Buyer',
                    html: `<p>Name: ${userDocBuyer.firstname} ${userDocBuyer.lastname}</p><p>Email: ${userDocBuyer.email}</p><p>Phone Number: ${userDocBuyer.phno}</p><p>Property: ${itemDoc.title}</p>`,
                },
                    function (error, info) {
                        if (error) {
                            console.log(error.code);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                res.json({ "status": true, "data": userDoc });
            } catch (e) {
                res.json({ "status": false, "data": e.message });
            }
        });
    } else {
        res.json({ "status": false, "data": "Unauthorized User! Login first." });
    }
});

app.post('/api/updateitem/:id', async (req, res) => {
    var _id = req.params.id;
    const { token } = req.cookies;
    const { place, area, bedrooms, bathrooms, nearby, title } = req.body;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            try {
                const itemDoc = await Item.findOneAndUpdate({ owner: userData.email, _id: _id }, { place: place, area: area, bedrooms: bedrooms, bathrooms: bathrooms, nearby: nearby, title: title }, {
                    new: true,
                });
                if (itemDoc == null) {
                    res.json({ "status": false, "data": "Property not found!" });
                } else {
                    res.json({ "status": true, "data": "Property Updated Successfully!" });
                }
            } catch (e) {
                res.json({ "status": false, "data": e.errmsg || e._message });
            }
        });
    } else {
        res.json({ "status": false, "data": "Unauthorized User! Login first." });
    }
});

app.get('/api/deleteitem/:id', async (req, res) => {
    var _id = req.params.id;
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            try {
                const doc = await Item.deleteOne({ _id: _id, owner: userData.email })
                if (doc.deletedCount) {
                    res.json({ "status": true, "data": "Property Deleted Successfully!" });
                }
                else {
                    res.json({ "status": false, "data": "Property not found!" });
                }
            } catch (e) {
                res.json({ "status": false, "data": e.errmsg || e._message });
            }
        });
    } else {
        res.json({ "status": false, "data": "Unauthorized User! Login first." });
    }
});

app.post('/api/postitem', async (req, res) => {
    const { token } = req.cookies;
    const { place, area, bedrooms, bathrooms, nearby, title } = req.body;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            try {
                const owner = userData.email
                const itemDoc = await Item.create({
                    place, area, bedrooms, bathrooms, nearby, owner, title
                });
                res.json({ "status": true, "data": "Property posted Successfully!" });
            } catch (e) {
                res.json({ "status": false, "data": e.errmsg || e._message });
            }
        });
    } else {
        res.json({ "status": false, "data": "Unauthorized User! Login first." });
    }
});

app.get('/api/likeProp/:id', (req, res) => {
    const { token } = req.cookies;
    var propid = req.params.id;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            try {
                const itemDoc = await Item.findOneAndUpdate({ _id: propid }, { $push: { likes: userData.email } }, {
                    new: true,
                });
                if (itemDoc == null) {
                    res.json({ "status": false, "data": "Property not found!" });
                } else {
                    res.json({ "status": true, "data": itemDoc.likes });
                }
            } catch (e) {
                res.json({ "status": false, "data": e.errmsg || e._message });
            }
        });
    } else {
        res.json({ "status": false, "data": "Unauthorized User! Login first." });
    }
});

app.get('/api/unlikeProp/:id', (req, res) => {
    const { token } = req.cookies;
    var propid = req.params.id;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            try {
                const itemDoc = await Item.findOneAndUpdate({ _id: propid }, { $pull: { likes: userData.email } }, {
                    new: true,
                });
                if (itemDoc == null) {
                    res.json({ "status": false, "data": "Property not found!" });
                } else {
                    res.json({ "status": true, "data": itemDoc.likes });
                }
            } catch (e) {
                console.log(e)
                res.json({ "status": false, "data": e.errmsg || e._message });
            }
        });
    } else {
        res.json({ "status": false, "data": "Unauthorized User! Login first." });
    }
});

app.listen(4000, () => {
    console.log("Server running on port 4000...")
});