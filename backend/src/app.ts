import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import appRouter from './routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'

//Loading .env files
dotenv.config()

const app = express();

// Tells the app that we will be using JSon for incoming and outging request (MIDDLEWARE)
app.use(cors({
    origin: 'http://127.0.0.1:5173', // Specifies which domains can access this API
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET)); //provide a secret string

//remove in production build
app.use(morgan("dev"))

//Middlewares
app.use("/api/v1/", appRouter)
/*ROUTES*/


export default app;