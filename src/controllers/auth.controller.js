const { validationResult } = require('express-validator');
const authService = require('../services/auth.service');

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    const user = await authService.register({ name, email, password });
    res.status(201).json({ message: 'User created. Check email to verify.' });
  } catch (err) {
    next(err);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: 'Token missing' });
    await authService.verifyEmail(token);
    // Redirect to frontend verification success page (optional)
    res.redirect(process.env.FRONTEND_URL + '/verify-success');
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const token = await authService.login({ email, password });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
