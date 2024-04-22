const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 200
      });
}

exports.registerUser = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'Por favor informe um usuário e uma senha!' });
    }
    try {
        let exist = await User.findOne({ email: req.body.email })
        if (exist) {
            return res.status(400).json({ 'msg': 'O usuário já está em uso!' });
        }

        let newUser = User(req.body);
        return await newUser.save();

    } catch (error) {
        return res.status(400).json({ 'msg': error });
    }

};

exports.loginUser = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'Por favor informe um usuário e uma senha!' });
    }

    let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ 'msg': 'Usuário não existe!' });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                return res.status(200).json({
                    token: createToken(user)
                });
            } else {
                return res.status(400).json({ msg: 'Email e senha incorretos' });
            }
        });

};
