const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()
require('express-async-errors')

// Console colors package
require('colors')

const postRoutes = require('./routes/postRoutes')

const app = express()

const PORT = process.env.PORT || 3000

// General Middlewares
app.use(express.json())

// Routes
app.use('/api/v1/posts',postRoutes)

// Error Handling middlewares


// Connect DB method
const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
}

connectDB().then(() => {

    console.log('DB Connected successfully!'.yellow.bold.underline)

    // starting the server when db connection is successful
    app.listen(PORT , () => {
        console.log(`Server running on port: ${PORT}...`.cyan.bold.underline)
    })

}).catch((err) => {
    console.log(err)
})


