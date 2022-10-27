const User = require('../models/user.js')
const bcrypt = require('bcrypt')


exports.signup = (req,res,next)=>{
    const {name,email,phonenumber,password} = req.body
    console.log(req.body)
    if(name == undefined || name.length === 0 
        || email == undefined || email.length === 0
        || phonenumber == undefined || phonenumber.length === 0
        || password == undefined || password.length === 0)
        {
            return res.status(400).json({err:'Parameters Missing'})
        }
    User.findAll()
    .then(users=>{
        console.log(users,"User found all check body or data")
        return bcrypt.hash(password, 10 )
    })
    .then(hash=>{
        return User.create({name,email,phonenumber,password:hash})
    })
    .then(user=>{
        res.status(201).json({message:'User Successfully Created'})
    })
    .catch(err=>{
        console.log(err.fields,"--error in signup controller")
        res.status(500).json({err:'User Already Exist'})
    })
}


