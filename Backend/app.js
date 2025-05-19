import express from "express"
import Cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({limit : "4mb", extended : true}))
app.use(Cors())



export default app