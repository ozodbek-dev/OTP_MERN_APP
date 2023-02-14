import "./config/loadDotenv.js"
import express from 'express'
import cors from 'cors'
import connectToServer from "./config/server.js";
import morgan from 'morgan'
import connectToDb from "./config/db.js";
import route from "./routes/route.js";
const app = express()

//Middlewares;
app.use(cors());
app.use(express.json())
app.use(morgan("tiny"))
app.disable("x-powered-by")//less hackers know about our stack

//routes
app.use('/api', route)

//start server  only when we have valid connection

connectToDb()
connectToServer(app)



