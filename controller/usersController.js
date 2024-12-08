//internal modules
const bcrypt = require('bcrypt')
const User = require('../models/people');
const People = require('../models/people');
const {unlink} = require('fs');
const path = require('path');

//get login page
async function getUsers(req, res, next){
        try {
            let users = await People.find();
            res.render('users',{
                users: users,
            })
        } catch (error) {
            next(error);
        }
};

//remove user
async function removeUser(req, res, next) {
    try {
        const user = await People.findByIdAndDelete({
            _id: req.params.id,
        });
        
        
       // remove user if any
       if (user.avatar) {
        unlink(
            path.join(__dirname, `/../public/uploads/avatar/${user.avatar}`), // Corrected method
            (error) => {
                if (error) {
                    console.log(error);
                }
            }
        );
    }
    

        res.status(200).json({
            result: user,
            message: "User was removed successfully!",
        })
    } catch (error) {
        res.status(500).json({
            errors: {
                common:{
                    msg:"could not delete the user!",
                }
            },
        })
    }
}

//add user
async function addUser(req, res, next) {
    let newUser;
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashPassword,
        })
    } else{
        newUser = new User({
            ...req.body,
            password: hashPassword,
        })
    }

    //save user or send error
    try {
        const result = await newUser.save();
        res.status(200).json({
            message: "User was added successfully!",
        })
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknown error occured!"
                }
            }
        })
    }
}

module.exports = {
    getUsers,
    addUser,
    removeUser
}