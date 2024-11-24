const express = require('express');
const jwt = require('jsonwebtoken');

const secretKey = 'AbdiAMD123$$'

function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Unauthorized no token');
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized');
        }

        console.log(decoded);
        req.user = decoded;
        next();
    });
}

module.exports = {generateToken, verifyToken, secretKey}