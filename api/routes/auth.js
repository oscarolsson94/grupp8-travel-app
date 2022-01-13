import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString(),
    });
    try {
        const user = await newUser.save();
        res.status(201).json({
            id: user._id,
            accessToken: user.accessToken,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        });
    } catch (err) {
        res.status(500).json(err.code);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user && res.status(401).json("Wrong password or username!")) { return; };
        

        const bytes = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        );
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password &&
            res.status(401).json("Wrong password or username!")) { return; };

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "30d" }
        );

        const { password, ...info } = user._doc; //dont send password with response

        res.status(200).json({ ...info, accessToken });
    } catch (err) {
        res.status(500).json(
            "No user with that username and password combination"
        );
    }
});

//CHANGE PASSWORD

export default router;
