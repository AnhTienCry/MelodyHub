"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_js_1 = __importDefault(require("../config/database.js"));
const User_js_1 = __importDefault(require("../models/User.js"));
dotenv_1.default.config();
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin.MelodyHub@gmail.com';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'MelodyHub123';
const ADMIN_USERNAME = process.env.SEED_ADMIN_USERNAME || 'melodyhub_admin';
const seedAdmin = async () => {
    try {
        await (0, database_js_1.default)();
        const existing = await User_js_1.default.findOne({ email: ADMIN_EMAIL.toLowerCase() });
        if (existing) {
            console.log(`Admin user already exists: ${existing.email} (role=${existing.role})`);
            process.exit(0);
        }
        const hashed = await bcryptjs_1.default.hash(ADMIN_PASSWORD, 10);
        const admin = new User_js_1.default({ username: ADMIN_USERNAME, email: ADMIN_EMAIL.toLowerCase(), password: hashed, role: 'admin' });
        await admin.save();
        console.log(`Created admin user: ${ADMIN_EMAIL} with password from env or default.`);
        process.exit(0);
    }
    catch (err) {
        console.error('Error seeding admin user', err);
        process.exit(1);
    }
};
seedAdmin();
//# sourceMappingURL=seedAdmin.js.map