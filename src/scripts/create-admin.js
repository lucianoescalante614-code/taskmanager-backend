require('dotenv').config();
const { connectDB } = require('../config/db');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

(async () => {
  try {
    await connectDB();
    const email = process.argv[2] || 'admin@local.test';
    const password = process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Admin';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, isActive: true, role: 'admin' });
    console.log('Admin created:', user.email);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
