const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const user = require('./routes/user')
const connectmongo = require('./db/connect')
const app = express()
app.use(express.json())
app.use('/chat/api/v1', user)

const port = process.env.PORT || 5000

app.listen(port, (req, res) => {
    connectmongo();
    console.log(`server is listening at port ${port}`);
})
