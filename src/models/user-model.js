import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../config/serverConfig.js'
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },  
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    }
});

userSchema.pre('save', async function(next) {
    const SALT = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(this.password, SALT);
    this.password = encryptedPassword;
    next();
});

userSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.genJWT = function generate() {
    return jwt.sign({id: this._id, email: this.email}, SECRET_KEY, {
        expiresIn: '1h'
    })
}

const User = mongoose.model('User', userSchema);

export default User;