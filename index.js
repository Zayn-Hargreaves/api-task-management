const express = require("express")
const app = express()
require("dotenv").config(); 
const port = process.env.port
const database = require("./config/database")
const Task = require("./api/v1/model/task.model")
const routerV1 = require("./api/v1/routers/index.router")
const bodyParser = require("body-parser")
const cors = require("cors")
database.connect()
// const corsOption = {
//     origin:"http:xyz.com"
// }
app.use(bodyParser.json())
app.use(cors())
routerV1(app)
app.listen(port , ()=>{
    console.log(`Đang lắng nghe cổng ${port}`)
})