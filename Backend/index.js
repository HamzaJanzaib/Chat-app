import dotenv from "dotenv"
dotenv.config()
import app from "./app"
import http from "http"

const PORT = process.env.PORT || 3000

const server = http.createServer(app);


server.listen(PORT, () => {
console.log(`server is listen on PORT Number ${PORT}`)
})


