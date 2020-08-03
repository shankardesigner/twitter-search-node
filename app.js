const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT
const userRouter = require('./src/routes/User')
const tweetsRouter = require('./src/routes/TweetSearchHistory')
const mainRouter = require('./src/routes/MainRoute')
require('./src/dbConfig/dbConfig')

const app = express();
app.use(cors());
app.use(express.json())

app.use(userRouter)
app.use(tweetsRouter)
app.use(mainRouter)

//Listen
app.listen(port, () => console.log(`app started on port: ${port}`));