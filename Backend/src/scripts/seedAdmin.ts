import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/database.js';
import User from '../models/User.js';

dotenv.config();

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin.MelodyHub@gmail.com';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'MelodyHub123';
const ADMIN_USERNAME = process.env.SEED_ADMIN_USERNAME || 'melodyhub_admin';

const seedAdmin = async () => {
  try {
    await connectDB();

    const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (existing) {
      console.log(`Admin user already exists: ${existing.email} (role=${existing.role})`);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const admin = new User({ username: ADMIN_USERNAME, email: ADMIN_EMAIL.toLowerCase(), password: hashed, role: 'admin' });
    await admin.save();

    console.log(`Created admin user: ${ADMIN_EMAIL} with password from env or default.`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin user', err);
    process.exit(1);
  }
};

seedAdmin();
