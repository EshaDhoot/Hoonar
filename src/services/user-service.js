import User from '../models/user-model.js';
import jwt from 'jsonwebtoken';
import { generateOTP, sendOTPByEmail, hashOTP } from '../utils/verification.js';
import { SECRET_KEY } from '../config/serverConfig.js';

class UserService {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in service layer");
            console.log(error);
        }
    }

    async signIn(data) {
        try {
            const user = await User.findOne({ email: data.email });
            if (!user) {
                throw new Error('No user Found');
            }
          
            if (!user.comparePassword(data.password)) {
                throw new Error('Incorrect Password');
            }
            if (!user.isVerified) {
                throw new Error('Email not verified');
            }
           
            const token = user.genJWT();
            return token;
        } 
        catch (error) {
            console.log("something went wrong in service layer");
            console.log(error);
            throw error;
        }
    }

    async sendOTP(data) {
        try {
    
            const email = data.email;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const OTP = generateOTP();
            sendOTPByEmail(email, OTP);
            await User.updateOne({ email }, { $set: { otp: hashOTP(OTP) } });
            console.log('email verification done');
            return true;

        } catch (error) {
            console.log("something went wrong in service layer");
            console.log('email verification failed');
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = jwt.verify(token, SECRET_KEY);
            if (!response) {
                throw new Error('Invalid Token');
            }

            const user = await User.getById(response.id);
            if (!user) {
                throw new Error('No user with the corresponding user exists');
            }

            return user.id;
        } catch (error) {
            console.log("Something went wrong in the Authentication process");
            throw error;
        }
    }
}

export default UserService;