const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret';
const defaultExpires = process.env.JWT_EXPIRES_IN || '1d';

exports.sign = (payload, options = {}) => jwt.sign(payload, secret, { expiresIn: options.expiresIn || defaultExpires });
exports.verify = (token) => jwt.verify(token, secret);
