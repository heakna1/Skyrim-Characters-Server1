// command center
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const db = require('./config/db')
const PORT = 8005

const characterRoutes = require('./routes/character_routes')
const requestLogger = require('./lib/request-logger')
const questRoutes = require("./routes/quest_routes")
const statsRoutes = require("./routes/stats_routes")
const userRoutes = require("./routes/user_routes")
const characterSeed = require('./lib/character-seed')

// deprecation warning
mongoose.set('strictQuery', true)

// creates the connection between your local MongoDB and this express app
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// starting an express app
const app = express()

app.use(cors({ origin: `http://127.0.0.1:5502` }))

app.use(express.json())
app.use(requestLogger)

// server needs to know about this router!!!
app.use(characterRoutes)
app.use(questRoutes)
app.use(statsRoutes)
app.use(userRoutes)
app.use('/seed', characterSeed)

app.listen(PORT, () => {
    console.log('listening on ' + PORT)
})

module.exports = app