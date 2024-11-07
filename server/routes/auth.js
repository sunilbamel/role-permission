const express = require('express');
const router = express.Router();
// const { VerifyToken } = require('../auth/auth');

const AuthController = require('../controllers/auth');

router.post('/login', AuthController.Login);
router.post('/verify-otp', AuthController.Verify_Otp);
router.post('/resend-otp', AuthController.resendotp);



module.exports = router;