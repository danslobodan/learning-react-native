const express = require('express');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    
    try {        
        const user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);

        return res.send({ token });
    } catch (err) {
        return res.status(422).send(err.message);
    }
})

router.post('/signin', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password)
        return res.status(422).send({ error: 'Must provide email and password' });

    const user = await User.findOne({ email });

    console.log(user);

    if (!user)
        return res.status(404).send({ error: 'Invalid username or password' });

    try {
        await user.comparePassword(password);
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid username or password' });
    }
    
})

module.exports = router;