require("dotenv").config()
const express = require("express")

const app = express()

const cors = require("cors")

const PORT = process.env.PORT || 8080

const userRouter = require("./routes/user.routes")
const orderRouter = require("./routes/order.routes")
const producto = require("./routes/producto.routes")

app.use(cors())
app.use(express.json())

app.use("/user", userRouter)
app.use("/order", orderRouter)
app.use("/producto", producto)



app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`)
})