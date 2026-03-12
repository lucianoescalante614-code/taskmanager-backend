const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('../utils/jwt');
const emailUtil = require('../utils/email');

exports.register = async ({ name, email, password }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw Object.assign(new Error('Email already in use'), { status: 400 });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });

  // Create verification token (short lived)
  const verifyToken = jwt.sign({ id: user.id }, { expiresIn: '1d' });
  await emailUtil.sendVerificationEmail(user.email, verifyToken);

  return user;
};

exports.verifyEmail = async (token) => {
  const payload = jwt.verify(token);
  const user = await User.findByPk(payload.id);
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  await user.update({ isActive: true });
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  if (!user.isActive) throw Object.assign(new Error('Please verify your email'), { status: 403 });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  return jwt.sign({ id: user.id });
};
