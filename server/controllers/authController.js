const User = require("../modules/usermodel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const foundUser = await User.findOne({ username: username }).lean()
    if (!foundUser) {
        return res.status(401).json({ message: 'עדיין לא נרשמת -> לך להרשם' })
    }
    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'ססמא או שם משתמש אינם מתאימים' }) 

    const userInfo = {
        _id: foundUser._id, 
        name: foundUser.name,
        roles: foundUser.roles, 
        username: foundUser.username,
        email: foundUser.email
    }

    const accessToken =
    jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
}

const register = async (req, res) => {
    const { username, password, name, email, phone, roles } = req.body;
    if (!name || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const duplicate = await User.findOne({ username: username }).lean();
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const userObject = { username, password: hashedPwd, name, email, phone, roles };
    const user = await User.create(userObject);

    if (user) { 
        const userInfo = {
            _id: user._id,
            name: user.name,
            roles: user.roles,
            usename: user.username,
            email: user.email
        };

        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);

        return res.status(201).json({
            message: `New user ${user.username} created`,
            accessToken: accessToken 
        });
    } else { 
        return res.status(400).json({ message: 'Invalid user received' });
    }
};
module.exports = { login, register }





