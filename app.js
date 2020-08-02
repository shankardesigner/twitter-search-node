const express = require('express');
const cors = require('cors');
const port = process.env.PORT
const userRouter = require('./src/routes/User')
require('./src/dbConfig/dbConfig')

const app = express();
app.use(cors());
app.use(express.json())

app.use(userRouter)


//Listen
app.listen(port, () => console.log(`app started on port: ${port}`));