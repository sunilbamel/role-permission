const { CreateActivityLog, UpdateActivityLog } = require("../helper/activitytracker");
const { success, failed } = require("../helper/response");
const { AuthValidation } = require("../helper/validationRules");
const bcrypt = require('bcryptjs');
const { Admin, VerifyOtp, Role } = require("../models");
const { GenerateToken } = require("../auth/auth");
const nodemail = require("../services/nodemail");

const Login = async (req, res) => {
    const activitylog = await CreateActivityLog("login", req, req.body.email, null)
    try {
        const validationErrors = AuthValidation.Login(req.body);
        if (validationErrors) {
            throw new Error(validationErrors);
        }
        const data = await Admin.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!data) {
            throw new Error("Invalid email or password.")
        }
        if (data.status == 0) {
            throw new Error("User is not active.")
        }
        const check = bcrypt.compareSync(req.body.password, data.password);
        if (check == false) {
            throw new Error("Invalid email or password.")
        }
        const otpdata = await VerifyOtp.findOne({
            where: {
                email: req.body.email
            }
        })
        const otp = Math.floor(Math.random() * 899999 + 100000);
        let d = new Date();
        d.setMinutes(d.getMinutes() + 2);
        if (otpdata) {
            otpdata.otp = otp;
            otpdata.expired_at = d
            otpdata.save()
        } else {
            VerifyOtp.create({
                email: req.body.email,
                otp: otp,
                expired_at: d
            })
        }
        await nodemail(data.email, "Login Otp", `<p>Your otp is ${otp}</p>`)
        UpdateActivityLog(activitylog.id, success("Please verify otp first.", { email: data.email }), 2, data.id);
        return res.json(success("Please verify otp first.", { email: data.email }))
    } catch (err) {
        UpdateActivityLog(activitylog.id, failed(err.message), 2);
        return res.json(failed(err.message))
    }
}

const Verify_Otp = async (req, res) => {
    const activitylog = await CreateActivityLog("verify-otp", req, req.body)
    try {
        const validationErrors = AuthValidation.VerifyOtp(req.body);
        if (validationErrors) {
            throw new Error(validationErrors);
        }
        const user = await Admin.findOne({
            where: {
                email: req.body.email,
            },
            include: [
                {
                    model: Role,
                    where: {
                        status: 1
                    }
                }
            ]
        })
        if (!user) {
            throw new Error("Invalid request.")
        }
        if (user.status == 0) {
            throw new Error("User is not active.")
        }
        const data = await VerifyOtp.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!data) {
            throw new Error('Invalid request');
        }
        if (data.otp != req.body.otp) {
            throw new Error('Wrong otp')
        }
        const newdate = new Date();
        if (newdate > data.expired_at) {
            throw new Error('OTP expired.')
        }

        const tokendata = {
            email: user.email,
            name: user.name,
            roleId: user.role_id,
            id: user.id
        }
        const token = GenerateToken(tokendata)
        UpdateActivityLog(activitylog.id, success("Login Successfully.", { email: user.email }), 2, user.id);
        return res.json(success("Login Successfully.", { token }))
    } catch (err) {
        UpdateActivityLog(activitylog.id, failed(err.message), 2);
        return res.json(failed(err.message))
    }
}

const resendotp = async (req, res) => {
    const activityid = await CreateActivityLog("resend-otp", req, req.body)
    try {
        const validationErrors = AuthValidation.ResendOtp(req.body);
        if (validationErrors) {
            throw new Error(validationErrors);
        }
        const user = await Admin.findOne({
            where: {
                email: req.body.email,
            }
        })
        if (!user) {
            throw new Error("Invalid request.")
        }
        if (user.status == 0) {
            throw new Error("User is not active.")
        }
        const otpdata = await VerifyOtp.findOne({
            where: {
                email: req.body.email
            }
        })
        const otp = Math.floor(Math.random() * 899999 + 100000);
        let d = new Date();
        d.setMinutes(d.getMinutes() + 2);
        otpdata.otp = otp;
        otpdata.expired_at = d
        otpdata.save()

        // const template = await ejs.renderFile(__dirname + '/otpemailtemplate.ejs',
        //     { otp: otp.toString().split('') }
        // );
        await nodemail(req.body.email, "Login Otp", `<p>Your otp is ${otp}</p>`)
        await UpdateActivityLog(activityid.id, success('Otp successfully send to your email.'), 1, user.id)
        return res.json(success('Otp successfully send to your email.'))
    } catch (err) {
        await UpdateActivityLog(activityid.id, failed(err.message), 2)
        return res.json(response.failed(err.message))
    }
}
module.exports = {
    Login,
    Verify_Otp,
    resendotp
}