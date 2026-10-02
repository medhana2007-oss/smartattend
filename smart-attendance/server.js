require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const otpStore = {};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.get("/", (req, res) => {
    res.send("College Registration Server Running");
});

app.post("/send-otp", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        otpStore[email] = {
            otp: otp,
            expires: Date.now() + 5 * 60 * 1000
        };

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "College Registration OTP",
            text: "Your OTP is " + otp + ". This OTP is valid for 5 minutes."
        });

        res.json({
            success: true,
            message: "OTP sent successfully!"
        });

    } catch (error) {
        console.error("Email Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send OTP"
        });
    }
});

app.post("/verify-otp", (req, res) => {

    const { email, otp } = req.body;

    const data = otpStore[email];

    if (!data) {
        return res.status(400).json({
            success: false,
            message: "OTP not found. Please request a new OTP."
        });
    }

    if (Date.now() > data.expires) {
        delete otpStore[email];

        return res.status(400).json({
            success: false,
            message: "OTP expired. Please request a new OTP."
        });
    }

    if (String(otp) !== String(data.otp)) {
        return res.status(400).json({
            success: false,
            message: "Invalid OTP"
        });
    }

    delete otpStore[email];

    res.json({
        success: true,
        message: "Email verified successfully!"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});