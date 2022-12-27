import User from '../model/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {createError} from './createError.js'

export const register =  async (req, res, next) =>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            password: hash,
        })

        await newUser.save();
        res.status(200).send("User has been created.");

    } catch (error) {
        next(error);

    }
}


export const login = async (req,res, next) =>{
    try {
        const user = await User.findOne({studentNumber: req.body.studentNumber})
        if(!user) 
        // return next(createError(404, "User not found!"))
        return res.status(400).json("User not found")

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) 
        // return next(createError(400,"Wrong password or Username!"))
        return res.status(400).json("Incorrect Password")

        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin},  'secretkey')

        const {password, ...others} = user._doc
        
        res.status(200).json({...others, accessToken, message: "Login Success!"})
        

        // if(others.status === 'active'){
        //     res.status(200).json({...others, accessToken})
        // }
        // else{
        //  next(createError(203, "Account is still pending.."))
        //}     

    } catch (error) {
        next(error);
    }
}

