require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')

const app = express()
app.use(express.json())
app.use('/api', routes) // using all the routes on the api base endpoint


const PORT = 7070;
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database connected')
})


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})

