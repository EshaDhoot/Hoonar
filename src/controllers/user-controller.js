import UserService from "../services/user-service.js";
import User from '../models/user-model.js';
import { verifyHashedOTP } from '../utils/verification.js';
const userService = new UserService();

export const create = async (req, res) => {
    try {
        const user = await userService.create(req.body);
        await userService.sendOTP(req.body);
        return res.status(201).json({
            data: user,
            message: "successfully registered and sent OTP on email",
            err: {},
            success: true
        });
    } catch (error) {
        console.log('something went wrong inside controller');
        return res.status(500).json({
            data: {},
            message: "unable to create a new user",
            err: error,
            success: false
        })
    }
}

export const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body);
        return res.status(200).json({
            message: 'Successsully signed in',
            success: true,
            data: response,
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "unable to sign in",
            data: {},
            success: false,
            err: error
        });
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user || !verifyHashedOTP(otp, user.otp)) {
            return res.status(401).send({ error: 'Invalid OTP' });
        }
        user.isVerified = true;
        await user.save();

        return res.status(201).json({
            message: "otp verified",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "otp verification failed",
            data: {},
            success: false,
            err: error
        });
    }

};


