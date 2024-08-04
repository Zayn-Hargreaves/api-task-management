const User = require("../model/user.model");
const md5 = require("md5")
const generateHelper = require("../../../helper/generateTokenHelper")
const ForgotPassword = require("../model/forgot-password.model")
const sendMail = require("../../../helper/sendEmail")
module.exports.register = async(req, res) => {
    const exitEmail = await User.find({
        deleted:false,
        email:email
    })
    if(exitEmail){
        res.json({
            code:400,
            message:"email đã tồn tại"
        })
    }
    const infoUser = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        token:generateHelper.generateRandomString(30)
    }
    const user = new User(infoUser)
    user.save()
    const token = user.token
    res.cookie("token", token)
    res.json({
        code: 200,
        token:token,
        message:'Đăng ký thành công'
    })
}
module.exports.login = async(req, res) =>{
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({
        email:email,
        deleted:false,
    })
    if(!user){
        res.json({
            code:200,
            message:"email không tồn tại"
        })
        return
    }
    if(md5(password) !== password){
        res.json({
            code:200,
            message:"Mật khẩu không tồn tại"
        })
        return;
    }
    const token = user.token
    res.cookie("token", token)
    res.json({
        code:200,
        message:"Đăng nhập không tồn tại",
        token:token
    })
}
module.exports.forgotPassword = async (req, res)=>{
    const email = req.body.email
    const user = await User.findOne({
        email:email,
        deleted:false,
    })
    if(!user){
        res.json({
            code:200,
            message:"email không tồn tại"
        })
        return
    }
    const otp =generateHelper.generateRandomNumber(8)
    const timeExpire = 5
    const objectForgotPassword = {
        email:email,
        otp:otp,
        expireAt:Date.now() + timeExpire *60*1000
    }
    const forgotPassword = new ForgotPassword(objectForgotPassword)
    forgotPassword.save()
    const subject = "mã mật khẩu otp"
    const html = `Đây là mã otp ${otp} thời gian sử dụng ${timeExpire}`
    sendMail.sendMail(email, subject, html)
    res.json({
        code:200,
        message:"Đã gửi mã otp qua email"
    })
}
module.exports.otpPassword = async(req, res) =>{
    const email = req.body.email
    const otp = req.body.otp
    const result = await ForgotPassword.find({
        email:email,
        otp:otp
    })
    if(!result){
        res.json({
            code:400,
            message:"otp không hơp lệ"
        })
    }
    const user = await User.findOne({
        email:email,
    })
    res.cookie("token", user.token)
    res.json({
        code:400,
        message:"otp không hơp lệ",
        token:user.token
    })
}
module.exports.resetPassword = async(req, res)=>{
    const password = req.body.password
    const token = res.body.token
    const user = await User.findOne({
        token:token,
        deleted:false
    })
    if(!user){
        res.json({
            code:400,
            message:"Tài khoản không tồn tại",
            token:user.token
        })
    }
    user.updateOne({
        token:token,
    },{
        password:md5(password)
    })
    res.json({
        code:200,
        message:"Đã gửi mã otp qua email"
    })
}

module.exports.detail = async(req, res) =>{
    res.json({
        code:200,
        message:"Thành công",
        user:req.user
    })
}

module.exports.list = async(req, res) =>{
    const users = await User.find({deleted:false}).select("fullName email")
    res.json({
        code:200,
        message:"Thành công",
        user:users
    })
}