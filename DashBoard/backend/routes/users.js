const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const async = require('async');
const {response} = require("express");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.Role === "Admin" ? true : false,
        isLecturer: req.user.Role === "Lecturer" ? true : false,
        isStudent: req.user.Role === "Student" ? true : false,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        Role: req.user.Role
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id,
                        name: user.name,
                        registeredCourse: user.registeredCourse
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});


router.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            name: 'admin',
            email: 'admin@example.com',
            password: 'admin123',
            isAdmin: true,
            isAuth: true,
            image: "http://gravatar.com/avatar/1621609774?d=identicon",
            token: "",
            tokenExp: null,
            role: 1
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({ message: error.message });
    }
});


router.get("/user_by_id", (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    console.log("req.query.id", req.query.id)

    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    console.log("productIds", productIds)


    //we need to find the product information that belong to product Id
    User.find({ '_id': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
});

// router.put("/updateUserInfo", (req, res) => {
//     const updatedUserInfo = ({
//         name: req.body.name,
//         email: req.body.email,
//         contactNumber: req.body.contactNumber
//     });
//     User.updateOne({ _id: req.params.id }, updatedUserInfo).then(result => {
//         console.log(result);
//         res.status(200).json({ message: "Successfully Updated" })
//     })
// });

router.put('/updateUserInfo/:id', (req,res)=>{
    const updatedUserInfo = (req.body);
    User.findByIdAndUpdate({ _id: req.params.id }, updatedUserInfo).then(result => {
        console.log(result);
        res.status(200).json({ message: "Successfully Updated" })
    })
})

router.get('/getAllUsers' , (req,res) => {
    User.find().then((users) => {
        res.json(users)
    }).catch((err) => {
        console.log(err);
    })
})

router.delete('/deleteUser/:id', (req,res)=>{
    const user = (req.body);
    User.findByIdAndDelete({ _id: req.params.id }, user).then(() => {
        res.status(200).json({ message: "Successfully Deleted" })
    })
})

module.exports = router;
