import { Request, Response, NextFunction } from "express"
import User from "../models/users"
import { hash, compare} from 'bcrypt' 
import { createToken } from "../utils/token.manager";
import { COOKIE_NAME } from "../utils/constants";

export const getAllUsers = async (req: Request, res: Response,next: NextFunction)=>{

    try {
        //get all users from database
        const users = await User.find();
        return res.status(200).json({message: "Ok", users})

    } catch (error) {
        console.log("get all users error: ",error)
        return res.status(200).json({message:"ERR", cause: error.message });
    }
}

//SignUp
export const userSignUp = async (req: Request, res:Response, next: NextFunction)=>{
    try {
        //we need to get data from the req bosy
        const {name, email, password} = req.body;

        //Check if user with email already existed or not
        const existedUser = await User.findOne({email});

        if(existedUser) return res.status(401).send("User already exited")

        //we should also do some validation check. For that we should have first passed the data through a validation middleware

        const saltRounds = 10;
        const hashedPassword = await hash(password, saltRounds);
        
        //we had hashed password using hashing from bcrypt
        //since password is the field name, so we need naming 
        const user = new User({name, email, password: hashedPassword})

        //now save the user in the database
        await user.save();

        //create token and store cookie
        res.clearCookie(COOKIE_NAME,{
            httpOnly : true,
            domain: 'localhost',
            signed:true,
            path     : '/'
        })
        const token = createToken(user._id.toString(), user.email, "7d")
        console.log(`token is: ${token}`)

        const expires = new Date();
        expires.setDate(expires.getDate()+7)

        //send the token in form of cookies
        res.cookie(COOKIE_NAME,token,{path:"/", domain:"localhost", expires, httpOnly:true, signed: true, sameSite: 'none'})

        return res.status(201).json({message:"OK", name: user.name, email: user.email})

    } catch (error) {
        console.log(error)
        return res.status(200).json({message:"ERR", cause: error.message})
    }
}

//LogIn
export const userLogIn = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        //here i need to unhash the password using bcrypt.compare method and check if the email matches the correct passowrd
        console.log(req.body)
        const {email, password} = req.body;
        
        //If email and password fields are empty(although it will be checked by the validator)
        if(!email || !password){
            throw Error('Email and Password are required')
        }
        
        //find the user
        const user = await User.findOne({email})
        //if no such user found
        if (!user) res.status(401).send('User is not registered');

        //compare the password
        //encrypted string is present in the user object
        const isPasswordCorrect = await compare(password, user.password);

        if(!isPasswordCorrect) return res.status(403).send("Incorrect Password");//403-> forbidden

        //NOTE: first we need to remove any previous login cookie
        res.clearCookie(COOKIE_NAME,{
            path: "/",
            httpOnly : true,
            domain: "localhost",
            signed:true
        })
        
        //Correct. Now login the user
        const token = createToken(user._id.toString(), user.email,"7d")
        console.log(`Token : ${token}`)

        const expires = new Date();
        expires.setDate(expires.getDate()+7)

        //send the token in form of cookies
        res.cookie(COOKIE_NAME,token,{path:"/", domain:"localhost", expires, httpOnly:true, signed: true, sameSite: 'none', secure: true})

        return res.status(200).json({message: "Ok", name: user.name, email: user.email})


    } catch (error) {
        console.log(error)
        return res.status(200).json({message:"ERR", cause: error.message})
    }
}

//Verify User
export const verifyUser = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        
        //find the user
        console.log(res.locals.jwtData.email)
        const user = await User.findOne({email: res.locals.jwtData.email})
        // console.log(user)
        //if no such user found
        if (!user) res.status(401).send('User is not registered or Token expired');

        // console.log(user._id.toString(), res.locals.jwtData.id)

        if(user._id.toString()!== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }

        return res.status(200).json({message: "Ok", name: user.name, email: user.email})


    } catch (error) {
        console.log(error)
        return res.status(200).json({message:"ERR", cause: error.message})
    }
}

//logout
export const userLogout = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        
        //find the user and remove the cookie
        console.log(res.locals.jwtData.email)
        const user = await User.findOne({email: res.locals.jwtData.email})
        // console.log(user)
        //if no such user found
        if (!user) res.status(401).send('User is not registered or Token expired');

        // console.log(user._id.toString(), res.locals.jwtData.id)

        if(user._id.toString()!== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }

        res.clearCookie(COOKIE_NAME,{
            httpOnly: true,
            domain: 'localhost',
            signed: true,
            path:"/"
        })

    } catch (error) {
        console.log(error)
        return res.status(200).json({message:"ERR", cause: error.message})
    }
}