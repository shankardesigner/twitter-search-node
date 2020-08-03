const mongoose = require('mongoose')

try {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
} catch (error) {
    console.log(error)
}