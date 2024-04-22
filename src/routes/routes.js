import express from 'express';
const router = express.Router();

import { create, signIn, verifyOTP } from '../controllers/user-controller.js';


router.post('/signup', create);

router.post('/verifyOtp', verifyOTP);

router.post('/signin', signIn);


export default router;