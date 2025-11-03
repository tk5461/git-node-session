require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbconnect")
connectDB()

const PORT = process.env.PORT || 1003

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.use("/user", require("./routes/users"))
app.use("/product", require("./routes/product"))
app.use("/ShoppingCart", require("./routes/ShoppingCart"))

app.listen(PORT, () => {
    console.log(`The server runnig on port ${PORT}`);
})

