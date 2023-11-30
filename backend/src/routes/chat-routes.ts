import { Router } from "express";
import { verifyToken } from "../utils/token.manager";
import { chatCompeltionValidator, validate } from "../utils/validator";
import { deleteAllChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controller";
import { send } from "process";

//Protected APi (because only a logged person can use it)
const chatRoutes = Router();

chatRoutes.post("/new", validate(chatCompeltionValidator), verifyToken, generateChatCompletion)

chatRoutes.get("/allChats", verifyToken, sendChatsToUser)

//delete all chats of a user
chatRoutes.delete("/deleteChats", verifyToken, deleteAllChats)

export default chatRoutes;
