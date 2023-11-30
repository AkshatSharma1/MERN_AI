import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

//custom validator
export const validate = (validations: ValidationChain[]) =>{
    return async(req: Request, res: Response, next: NextFunction)=>{
        for(let validation of validations){
            const result = await validation.run(req);
            if(!result.isEmpty()) break;
        }

        const errors = validationResult(req);

        //if error present, donot go to next midddleware
        if(errors.isEmpty()) return next();
        return res.status(422).json({errors: errors.array()})
    }
}

export const loginValidator = [
    body("email").notEmpty().trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min:6}).withMessage('Password should contain atleast 6 characters'),
]

export const signupValidator = [
    body("name").notEmpty().withMessage('Name is required'),
    body("email").notEmpty().trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min:6}).withMessage('Password should contain atleast 6 characters'),
]

//NOTE: What we can do above is that we can use ...loginValidator inside signUpvalidator because login and signup have all in common except name field. SO remove name from login and use ...login in singup

export const chatCompeltionValidator = [
    body("message").notEmpty().withMessage('Message is required')
]