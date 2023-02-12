import express from 'express'
import connectToServer from "./config/server.js";
const app = express()


connectToServer(app)

