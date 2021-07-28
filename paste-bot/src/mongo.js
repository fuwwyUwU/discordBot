const mongoose = require('mongoose')
const { mongoPath} = require (process.env.mongoPath)
    
    module.exports = async () => {
        await mongoose.connect(mongoPath)
        return mongoose
    }
