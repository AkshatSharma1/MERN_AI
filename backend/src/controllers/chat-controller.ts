import { Request, Response, NextFunction } from "express";
import User from "../models/users"
import { configureOpenAI } from "../config/openai-config";
import OpenAI from "openai";
import { ClientOptions } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

type ChatMessage = {
    role: string;
    content: string;
}

// Interface for a chat message
export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    //we want message from the user
    const { message } = req.body;
    try{
        const user = await User.findById(res.locals.jwtData.id)

        if(!user) return res.status(401).json({message: "User not registered or Token expired"})

        //1. now grab all the chats since user is there
        //check open ai api documentation

        const latestMessage = {content: message, role: "user"};

        const chats = user.chats.map(({role, content})=>({role, content})) as ChatCompletionMessageParam[]

        //push new message at the end
        // const userMessage: ChatMessage = { role: "user", content: message };
        chats.push({content: message, role: "user"});
        user.chats.push({content: message, role: "user"}) //push to model also

        //2. send all chats with new one chat to API(openai)
        const config: ClientOptions = configureOpenAI();
        const openai = new OpenAI(config);

        //3. get latest response
        const chatResponse = await openai.chat.completions.create({
            messages: chats,
            model: "gpt-3.5-turbo"
        });

        console.log(chatResponse.choices[0].message)
        user.chats.push(chatResponse.choices[0].message)
        await user.save();

        return res.status(200).json({chats: user.chats});
        
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: "Something went wrong"}) //server error
    }    
}

export const sendChatsToUser =async (req: Request, res: Response, next: NextFunction) => {
    //If the user if logged in and verified then send all chats of the user to the chat screen
    try{
        const user = await User.findById(res.locals.jwtData.id);
        
        if(!user){
            console.log('erro is user noy found')
            return res.status(401).send("Unauthorized or user not present")
        }

        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Unauthorized");
        }

        return res.status(200).json({message:"OK", chats: user.chats})
    }
    catch(error){
        return res.status(200).json({message: "ERROR", cause: error.message})
    }
}

//delete ll chats
export const deleteAllChats =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);

        if(!user){
            console.log('error is user noy found')
            return res.status(401).send("Unauthorized or user not present")
        }

        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Unauthorized");
        }

        //now here we want to get all chats deleted, so what we can do is that replace chats array with empty one
        //@ts-ignore
        user.chats = []
        await user.save()
        return res.status(200).json({message:"OK"})

    } catch (error) {
        console.log("error deleting messages")
    }
    
}