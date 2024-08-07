const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config(); 
const port = process.env.PORT
const database = require("./config/database")
const routerV1 = require("./api/v1/routers/index.router")
const bodyParser = require("body-parser")
const cors = require("cors")
database.connect()
// const corsOption = {
//     origin:"http:xyz.com"
// }
console.log(port)
app.use(bodyParser.json())
app.use(cors())
routerV1(app)
app.listen(port , ()=>{
    console.log(`Đang lắng nghe cổng ${port}`)
})