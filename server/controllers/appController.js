import UserModel from "../models/User.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'

export async function register(req, res) {
    try {
        const {username, password, profile, email} = req.body;
        //check existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({username}, function (err, user) {
                if (err) reject(new Error(err));
                if (user) reject({error: "Please use unique username"})
                resolve()
            })
        })
        //check existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({email}, function (err, {email}) {
                if (err) reject(new Error(err));
                if (email) reject({error: "Please use unique username, this username is used already!"})
            })
            resolve();
        });

        Promise.all([existUsername, existEmail])
            .then(() => {
                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                email,
                                profile,

                            })
                            user.save()
                                .then(result => res.status(201).send({
                                    msg: "user Register Successfully",
                                    user: result
                                })).catch(error => res.status(500).send({error}))
                        }).catch(err => {
                        return res.status(500).send({
                            error: "Enable to hashed password \n" + err.message
                        })
                    })
                }
            })
            .catch(err => {
                return res.status(500).send({
                    error: err
                })
            })

    } catch (e) {
        return res.status(500).send({error: e})
    }
}

export async function login(req, res) {
    try {
        const {username, password} = req.body;
        console.log(username)

        UserModel.findOne({username})
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) return res.status(400).send({
                            error: "Don't have Password"
                        })

                        //create jwt token
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, process.env.JWT_SECRET, {expiresIn: "24h"})
                        return res.status(201).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        })
                    }).catch(error => {
                    return res.status(400).send({error: "Password does not match!"})
                })
            })
            .catch(error => {
                return res.status(404).send({error: "User not found \n" + error?.message})
            })


    } catch (e) {
        return res.status(500).send({error: e})
    }
}

export async function getUser(req, res) {
    const {username} = req.params
    try {
        if (!username) return res.status(501).send({error: "Invalid Username"})
        UserModel.findOne({username}, function (err, user) {
            if (err) return res.status(500).send({error: "Could not Find the user"});
            if (user) {
                // const {password, ...rest} = user._doc;
                const {password, ...data} = Object.assign({}, user.toJSON())
                return res.status(201).send(data);
            } else {
                return res.status(500).send({error: "Could not Find the user"})
            }
        })
    } catch (e) {
        return res.status(404).send({error: "Cannot find user Data " + e.message})
    }
}

export async function updateUser(req, res) {
    try {
        const {userId} = req.user;
        if (userId) {
            const {password, ...body} = req.body;
            // update user data;
            UserModel.updateOne(
                {_id: userId}, body,
                function (err, user) {
                    if (err) throw err;
                    return res.status(201).send({msg: "Record Updated..."});
                });
        }
    } catch (e) {
        return res.status(404).send({error: "Cannot update user Data: " + e.message})
    }
}

export async function generateOTP(req, res) {
    req.app.locals.OTP = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })
    res.status(201).send({code: req.app.locals.OTP})
}

export async function verifyOTP(req, res) {
    const {code} = req.query;
    console.log(code)
    console.log(req.app.locals.OTP)
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({msg: "Verify Successfully!"})
    }
    return res.status(400).send({error: "Invalid OTP"})
}

export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        req.app.locals.resetSession = false;
        return res.status(201).send({msg: "Access Granted!"});

    }
    return res.status(440).send({error: "Session Expired!"})
}

export async function resetPassword(req, res) {
    try {
        if(!req.app.locals.resetSession) return res.status(440).send({error: "Session Expired!"})

        const {username, password} = req.body;
        try {
            UserModel.findOne({username})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword=>{
                            UserModel.updateOne({username: user.username},{
                                password:hashedPassword
                            }, function(err,data){
                                if(err){
                                     throw err
                                }
                                req.app.locals.resetSession=false;
                                return res.status(201).send({msg:"Record Updated Successfully!"})
                            })
                        })
                        .catch(e => {
                            return res.status(500).send({error: "Enable to hashed password " + e?.message})
                        })
                })
                .catch(error => {
                    return res.status(404).send({error: "Username not Found - " + error})
                })
        } catch (e) {
            return res.status(500).send({error: e})
        }

    } catch (e) {
        return res.status(401).send({error: e})
    }
}