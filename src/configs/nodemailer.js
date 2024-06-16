const nodemailer = require("nodemailer");
const appConfig = require("./env.config");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: appConfig.GMAIL_USER,
        pass: appConfig.GMAIL_PASSWORD
    }
});

const sendMail = async (email, token) => {
    const resetUrl = `http://localhost:3000/reset-password?${email}=${token}`;
    
    const mailOptions = {
        from: `Cửa hàng điện máy <quoctuan200702@gmail.com>`,
        to: email,
        subject: 'Đặt lại mật khẩu',
        html: `
            <p>Nhấn vào đường dẫn để đặt lại mật khẩu <a href="${resetUrl}">tại đây!</a></p></br>
            <p style="color:red">Chú ý: Đường dẫn chỉ tồn tại 1 phút!</p>
        `
    };

    try{
        await transporter.sendMail(mailOptions);
        return true;
    }catch(error){
        console.log(error);
        throw new Error();
    }
}

module.exports = { sendMail };