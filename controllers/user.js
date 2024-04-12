const jwt = require('jsonwebtoken');
const { validateUser, User } = require('../models/User');
const { hashPass, comparePass } = require('../helpers/bcryptHelper');

module.exports.login = async (req, res) => {
    const body = req.body;

    try {
        if (!body.username && !body.password) {
            return res.status(400).json({ error: 'Username or password cannot be empty.' });
        }

        const user = await User.findOne({ username: body.username });

        const isMatch = await comparePass(body.password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const token = jwt.sign({
            username: body.username
        }, process.env.JWT_SECRET_KEY || 'secretKey', {
            expiresIn: '1h'
        });

        res.send(token);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error: Unable to log in user.' });
    }
};

module.exports.register = async (req, res) => {
    try {
        const body = req.body;

        const { error } = validateUser(body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        const existingUsername = await User.findOne({ username: body.username });

        if (existingUsername) res.status(400).json({ error: 'This username is already in use.' });

        const hashedPass = await hashPass(body.password);

        const user = new User({
            username: body.username,
            password: hashedPass
        });

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error: Unable to register user.' });
    }
};

module.exports.users = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};
