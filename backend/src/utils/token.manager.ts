import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';
import { COOKIE_NAME } from './constants';
export const createToken = (id: string, email: string, expiresIn: string)=>{

    //object
    const payload = {id, email};

    //sign(payload, secretkey, {options})
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn}) //expiresIn: "7d"

    return token;
}

//verify the token got from the req object
export const verifyToken = async (req: Request, res: Response, next:NextFunction) => {
    
    const token = req.signedCookies[COOKIE_NAME] //here auth_token
    console.log(`Token is: ${token}`)

    if(!token || token.trim()===""){
        return res.status(401).json({message: "Token not received"})
    }
    
    return new Promise<void>((resolve, reject)=>{
        return jwt.verify(token, process.env.JWT_SECRET, (err, success)=>{
            if(err) 
            {
                reject();
                return res.status(401).json({message: "token expired"})
            }
            else{
                console.log('Token verifcation success')
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        })
    })
}