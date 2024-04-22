import crypto from 'crypto';
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';

import { USER_EMAIL, PASSWORD } from '../config/serverConfig.js'

// Generate a random 6-digit OTP
export const generateOTP = () => {
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    // const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    // return hashedOtp;
    return otp;
};

// Hash the OTP
export const hashOTP = (otp) => {
  return crypto.createHash('sha256').update(otp).digest('hex');
};

// Verify hashed OTP
export const verifyHashedOTP = (otp, hashedOtp) => {
  const hashedInputOTP = hashOTP(otp);
  return hashedInputOTP === hashedOtp;
};

// Send OTP to user's email (using nodemailer)
export const sendOTPByEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
        auth: {
          user: USER_EMAIL,
          pass: PASSWORD,
        },
  });

  transporter.sendMail({
    to: email,
    subject: 'Email Verification',
    text: `Your OTP is: ${otp}`,
  });
};