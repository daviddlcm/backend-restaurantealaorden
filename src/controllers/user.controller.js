const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const salt = parseInt(process.env.SALTOS)

const postUser = async (req,res) => {
    try{
        const user = new User({
            nombre: req.body.nombre,
            email: req.body.email,
            username: req.body.username,
            token: req.body.token,
            password: bcrypt.hashSync(req.body.password, salt)
        })
        await user.save()
        // const token = jwt.sign({id: user.id_user}, process.env.SECRET,{
        //     expiresIn: 86400
        // })

        return res.status(201).json({
            message:"User created",
            user,
            success: true
        })
    }catch(error){
        return res.status(500).json({
            message: "cannot create user",
            error: error.message,
            success: false
        })
    }
}

const signIn = async (req,res) => {
    try{
        console.log("entra")
        const userFound = await User.findByEmail(req.body.username)
    if(!userFound){
        return res.status(404).json({
            message: "User not found",
            success: false
        })
    }
    const matchPassword = bcrypt.compareSync(req.body.password, userFound.password)
    if(!matchPassword){
        return res.status(404).json({
            message: "Invalid password",
            success:false
        })
    }
    // const token = jwt.sign({id: userFound.id_user}, process.env.SECRET,{
    //     expiresIn: 86400
    // })
    return res.status(200).json({
        message: "User logged",
        id_user: userFound.id_user,
        success:true
    })
    }catch(e){
        return res.status(500).json({
            message: "Cannot login",
            error: e.message,
            success: false
        })
    }
}

const getAllUsers = async (req,res) => {
    try{
        const users = await User.getAll()
    if(!users){
        return res.status(404).json({
            message: "No users found",
            success: false
        })
    }
    return res.status(200).json({
        message: "Users found",
        users,
        success: true
    })
    }catch(e){
        return res.status(500).json({
            message: "Cannot get users",
            error: e.message,
            success: false
        })
    }
}

const validateEmail = async(req,res) =>{
    try{
        const userFound = await User.findByEmail(req.query.email)
    if(userFound){
        return res.status(200).json({
            message: "Email already exists",
            success: false
        })
    }
    return res.status(200).json({
        message: "Email available",
        success: true
    })
    }catch(e){
        return res.status(500).json({
            message: "Cannot validate email",
            error: e.message,
            success: false
        })
    }
}



module.exports = {
    postUser,
    signIn,
    validateEmail,
    getAllUsers
}